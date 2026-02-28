export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
  role: 'buyer' | 'seller' | 'admin';
  phone?: string;
  address?: string;
  is_seller_verified?: number;
  kyc_data?: string;
}

export interface Subscription {
  id: number;
  user_id: number;
  box_id: number;
  plan: 'monthly' | 'quarterly' | 'annual';
  status: 'active' | 'paused' | 'cancelled';
  next_delivery_date: string;
  created_at: string;
}
