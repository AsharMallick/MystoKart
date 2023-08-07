import { Cart } from "./cart.interface";
import { Response } from "./order.interface";
import { Product } from "./product.interface";
import { User } from "./user.interface";

export interface State {
  auth: {
    message?: string | null;
    error?: string | null;
    user: User | null;
    loading: boolean;
    isAuthenticated?: boolean | null;
  };
  cartState: {
    cart: Cart;
  };
  product: {
    loading: boolean;
    product?: Product | null;
    products?: Product[] | null;
    error?: string | null;
    message?: string | null;
  };
  order: Response;
}
