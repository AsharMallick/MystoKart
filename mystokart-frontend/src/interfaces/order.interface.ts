import { Product } from "./product.interface";

export interface Response {
  url?: string | null;
  success: boolean;
  message?: string;
  error?: string;
  order?: Order;
  orders?: Order[] | null;
}

export interface Order {
  orderItems: Product[];
  shippingDetails: {
    address: string;
    pincode: number;
    email: string;
    country: string;
    state: string;
    city: string;
    phone: string;
  };
  totalPrice: number;
}
