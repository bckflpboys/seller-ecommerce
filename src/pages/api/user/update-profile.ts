import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { authOptions } from '../auth/[...nextauth]';
import type { Document, Types } from 'mongoose';

interface UserDocument extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  role: string;
  address: string;
  createdAt: Date;
}

interface SanitizedUser {
  name: string;
  email: string;
  role: string;
  address: string;
  createdAt: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'PUT' && req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    await connectDB();

    // GET request to fetch user profile
    if (req.method === 'GET') {
      const user = await User.findOne({ email: session.user?.email })
        .select('-password')
        .lean<UserDocument>();

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const sanitizedUser: SanitizedUser = {
        name: user.name,
        email: user.email,
        role: user.role,
        address: user.address || '',
        createdAt: user.createdAt.toISOString()
      };

      return res.status(200).json({ user: sanitizedUser });
    }

    // PUT request to update user profile
    const { name, address } = req.body;

    // Find user
    const user = await User.findOne({ email: session.user?.email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user data
    if (name) user.name = name;
    if (address) user.address = address;

    await user.save();

    // Fetch updated user
    const updatedUser = await User.findById(user._id)
      .select('-password')
      .lean<UserDocument>();

    if (!updatedUser) {
      throw new Error('Failed to fetch updated user data');
    }

    // Return sanitized user data
    const sanitizedUser: SanitizedUser = {
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      address: updatedUser.address || '',
      createdAt: updatedUser.createdAt.toISOString()
    };

    return res.status(200).json({ 
      user: sanitizedUser,
      message: 'Profile updated successfully'
    });

  } catch (error: any) {
    console.error('Profile update error:', error);
    return res.status(500).json({ 
      message: 'Error updating profile',
      error: error.message
    });
  }
}
