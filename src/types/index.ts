export interface User {
  id?: number;
  email: string;
  name: string;
  phone: string | null;
  address: string | null;
  createdAt?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user: User;
    token: string;
  };
  errors?: Array<{ msg: string; path: string }>;
}

export interface Tool {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

export interface CartItem {
  tool: Tool;
  quantity: number;
}
