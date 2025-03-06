import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const session = await getSession({ req });
    if (!session) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    await connectDB();

    const user = await User.findOne({ email: session.user?.email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Put the entire address string in the street field
    const address = {
      street: user.address || '',
      city: '',
      province: '',
      postalCode: '',
    };

    res.status(200).json({ address });
  } catch (error) {
    console.error('Error fetching user address:', error);
    res.status(500).json({ message: 'Error fetching user address' });
  }
}
