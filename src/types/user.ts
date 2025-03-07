export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: string;
  updatedAt: string;
  phoneNumber: string;
  address: {
    street: string;
    city: string;
    province: string;
    postalCode: string;
  };
}
