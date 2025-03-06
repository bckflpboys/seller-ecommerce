import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';
import cloudinary from 'cloudinary';
import formidable from 'formidable';
import fs from 'fs';

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Check if user is authenticated and is admin
    const session = await getServerSession(req, res, authOptions);
    if (!session || (session.user as any).role !== 'admin') {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Parse form data
    const form = formidable({});
    const [fields, files] = await form.parse(req);
    
    if (!files.file || !files.file[0]) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const file = files.file[0];

    // Upload file to a temporary folder in Cloudinary
    const result = await cloudinary.v2.uploader.upload(file.filepath, {
      folder: 'products/temp',
      resource_type: 'auto',
    });

    // Clean up the temporary file
    fs.unlinkSync(file.filepath);

    // Return both the URL and the public_id (we'll need this to move the file later)
    return res.status(200).json({
      url: result.secure_url,
      public_id: result.public_id
    });
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    return res.status(500).json({ message: 'Error uploading image' });
  }
}
