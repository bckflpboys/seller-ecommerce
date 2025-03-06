import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { User, Pencil, Save, X, MapPin, Heart, ShoppingBag } from 'lucide-react';

// Extend the Session User type
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
      address: string;
      phoneNumber: string;
    }
  }
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  address: string;
  phoneNumber: string;
}

interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

interface Order {
  id: string;
  date: string;
  status: string;
  total: number;
}

interface ApiResponse {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    addresses: Address[];
    favorites: any[];
  };
  message: string;
}

export default function Profile() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    address: '',
    phoneNumber: '',
    userType: 'user'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Dummy data for demonstration
  const [addresses] = useState<Address[]>([
    {
      id: '1',
      street: '123 Main St',
      city: 'Cape Town',
      state: 'Western Cape',
      zipCode: '7441',
      isDefault: true,
    },
  ]);

  const [orders] = useState<Order[]>([
    {
      id: '1',
      date: '2025-03-01',
      status: 'Delivered',
      total: 299.99,
    },
  ]);

  const [favorites] = useState<string[]>([
    'Organic Fertilizer',
    'Garden Tools Set',
    'Soil pH Tester',
  ]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    } else if (session?.user) {
      setProfile({
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        role: session.user.role,
        address: session.user.address,
        phoneNumber: session.user.phoneNumber
      });
      setFormData({
        id: session.user.id,
        name: session.user.name,
        address: session.user.address,
        phoneNumber: session.user.phoneNumber,
        userType: session.user.role
      });
    }
  }, [session, status, router]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData({
      id: profile?.id || '',
      name: profile?.name || '',
      address: profile?.address || '',
      phoneNumber: profile?.phoneNumber || '',
      userType: profile?.role || 'user'
    });
    setIsEditing(false);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: formData.id,
          name: (formData.name || '').trim(),
          address: (formData.address || '').trim(),
          phoneNumber: (formData.phoneNumber || '').trim(),
          userType: formData.userType,
        }),
      });

      const data: ApiResponse = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Error updating profile');
      }

      // Update profile state
      setProfile(prev => ({
        ...prev!,
        ...data.user
      }));

      // Update session data
      if (session?.user) {
        session.user.id = formData.id;
        session.user.name = (formData.name || '').trim();
        session.user.address = (formData.address || '').trim();
        session.user.phoneNumber = (formData.phoneNumber || '').trim();
        session.user.role = formData.userType;
      }
      
      setIsEditing(false);
    } catch (err: any) {
      setError(err.message);
      console.error('Profile update error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center">
            <p>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-gray-200 p-2 rounded-full">
                  <User className="w-12 h-12 text-gray-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{profile?.name}</h2>
                  <p className="text-gray-600">{profile?.email}</p>
                </div>
              </div>
              {!isEditing && (
                <button
                  onClick={handleEdit}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <Pencil className="w-4 h-4 mr-2" />
                  Edit Profile
                </button>
              )}
            </div>

            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label htmlFor="userType" className="block text-sm font-medium text-gray-700">
                    Account Type
                  </label>
                  <select
                    id="userType"
                    value={formData.userType}
                    onChange={(e) => setFormData({ ...formData, userType: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  >
                    <option value="user">Customer</option>
                    <option value="supplier">Supplier</option>
                  </select>
                </div>

                {error && <p className="text-red-600 text-sm">{error}</p>}
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="bg-white rounded-lg shadow p-6 space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Address</h3>
                  <p className="mt-1 text-sm text-gray-900">{profile?.address}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Phone Number</h3>
                  <p className="mt-1 text-sm text-gray-900">{profile?.phoneNumber}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Account Type</h3>
                  <p className="mt-1 text-sm text-gray-900 capitalize">
                    {profile?.role === 'supplier' ? 'Supplier' : 'Customer'}
                  </p>
                </div>
              </div>
            )}
          </div>
        );

      case 'orders':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Your Orders</h2>
            {orders.length > 0 ? (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="bg-white p-4 rounded-lg shadow border">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Order #{order.id}</p>
                        <p className="text-sm text-gray-600">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">R{order.total.toFixed(2)}</p>
                        <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No orders found.</p>
            )}
          </div>
        );

      case 'favorites':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Your Favorites</h2>
            {favorites.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {favorites.map((item, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow border">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{item}</p>
                      <Heart className="w-5 h-5 text-red-500 fill-current" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No favorites yet.</p>
            )}
          </div>
        );

      case 'addresses':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Delivery Addresses</h2>
              <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700">
                Add New Address
              </button>
            </div>
            {addresses.length > 0 ? (
              <div className="space-y-4">
                {addresses.map((address) => (
                  <div key={address.id} className="bg-white p-4 rounded-lg shadow border">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-5 h-5 text-gray-600" />
                          <p className="font-medium">{address.street}</p>
                        </div>
                        <p className="text-gray-600">{address.city}, {address.state}</p>
                        <p className="text-gray-600">{address.zipCode}</p>
                        {address.isDefault && (
                          <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                            Default Address
                          </span>
                        )}
                      </div>
                      <div className="space-x-2">
                        <button className="text-green-600 hover:text-green-700">Edit</button>
                        <button className="text-red-600 hover:text-red-700">Delete</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No addresses saved.</p>
            )}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {[
                { id: 'profile', label: 'Profile', icon: User },
                { id: 'orders', label: 'Orders', icon: ShoppingBag },
                { id: 'favorites', label: 'Favorites', icon: Heart },
                { id: 'addresses', label: 'Addresses', icon: MapPin },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`
                    flex-1 px-4 py-4 text-center border-b-2 text-sm font-medium
                    ${activeTab === id
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                  `}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <Icon className="w-5 h-5" />
                    <span>{label}</span>
                  </div>
                </button>
              ))}
            </nav>
          </div>
          <div className="p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
