import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  role: 'user' | 'admin';
  phoneNumber?: string;
  address?: {
    street: string;
    city: string;
    province: string;
    postalCode: string;
  };
  favorites: mongoose.Types.ObjectId[];
  createdAt: Date;
  hasFavorite: (productId: string) => boolean;
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
  },
  password: {
    type: String,
    required: false, // Make password optional for OAuth users
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  phoneNumber: {
    type: String,
    default: '',
  },
  address: {
    street: {
      type: String,
      default: '',
    },
    city: {
      type: String,
      default: '',
    },
    province: {
      type: String,
      default: '',
    },
    postalCode: {
      type: String,
      default: '',
    },
  },
  favorites: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }],
    default: [],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { 
  timestamps: true,
});

// Add a method to check if a product is favorited
userSchema.methods.hasFavorite = function(productId: string) {
  return this.favorites?.some((id: mongoose.Types.ObjectId) => 
    id.toString() === productId
  ) || false;
};

const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;