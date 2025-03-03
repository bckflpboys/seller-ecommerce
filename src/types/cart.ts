export interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
}

export interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}
