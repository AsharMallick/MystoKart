export interface Product {
  title: string;
  details: string;
  category: string;
  image: {
    public_id?: string;
    url: string;
  };
  stock: number;
  comment?: Comment[];
  price: number;
  _id: string;
  qty?: number;
}

export interface Comment {
  name: string;
  comment: string;
}

export interface Response {
  products?: Product[];
  product?: Product;
  loading: boolean;
  error?: string;
  message?: string;
  totalProducts: number;
  totalPages: number;
  featuredProducts?: Product[] | null;
}
