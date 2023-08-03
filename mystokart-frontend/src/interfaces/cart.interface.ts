import { Product } from "./product.interface";

export interface Cart {
  products: Product[];
  totalPrice: number;
}
