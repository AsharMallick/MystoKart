export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  avatar: {
    public_id: string;
    url: string;
  };
}

export interface Response {
  user?: User;
  loading: boolean;
  error?: string;
  message?: string;
}
