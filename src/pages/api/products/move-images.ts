import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

    const { productId, images } = req.body;

    if (!productId || !images || !images.length) {
      return res.status(400).json({ message: 'Missing productId or images' });
    }

    const updatedUrls = await Promise.all(
      images.map(async (image: { public_id: string; url: string }) => {
        // Extract the filename from the public_id
        const filename = image.public_id.split('/').pop();
        
        // Move the image to the product's folder
        const result = await cloudinary.v2.uploader.rename(
          image.public_id,
          `products/${productId}/${filename}`,
          { invalidate: true }
        );

        return result.secure_url;
      })
    );

    return res.status(200).json({ urls: updatedUrls });
  } catch (error) {
    console.error('Error moving images:', error);
    return res.status(500).json({ message: 'Error moving images' });
  }
}
