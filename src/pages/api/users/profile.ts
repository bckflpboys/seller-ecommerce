import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  await connectDB();

  switch (req.method) {
    case 'GET':
      try {
        const user = await User.findOne({ email: session.user?.email })
          .select('-password');
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user profile' });
      }
      break;

    case 'PUT':
      try {
        const user = await User.findOne({ email: session.user?.email });
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }

        // Allow updating these fields
        const { name, address, phoneNumber, userType } = req.body;
        if (name) user.name = name;
        if (address) user.address = address;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (userType && ['user', 'supplier'].includes(userType)) {
          user.role = userType;
        }

        await user.save();

        // Return the updated user data
        const updatedUser = await User.findById(user._id)
          .select('-password')
          .lean();

        res.status(200).json({ 
          user: updatedUser,
          message: 'Profile updated successfully' 
        });
      } catch (error) {
        res.status(500).json({ error: 'Failed to update profile' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
