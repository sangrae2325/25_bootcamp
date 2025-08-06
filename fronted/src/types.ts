export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  description: string;
  imageUrl: string;
  category?: string;
  createdAt?: string;
}

export interface OrderItem {
  productId: number;
  quantity: number;
}

export interface OrderRequest {
  userId: number;
  items: OrderItem[];
}

export interface Order {
  id: number;
  userId: number;
  createdAt: string;
  orderItems: {
    product: Product;
    quantity: number;
    price: number;
  }[];
}

// types.ts
export type OmitStrict<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
