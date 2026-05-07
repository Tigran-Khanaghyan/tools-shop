export interface User {
  email: string;
  name: string;
  phone: string;
  address: string;
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
