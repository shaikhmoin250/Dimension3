import { CartItem } from './cart-item.model';

export interface ShippingInfo {
  address: string;
  city: string;
  zip: string;
}

export interface PaymentInfo {
  card: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  shipping: ShippingInfo;
  payment: PaymentInfo;
  status: string;
  username: string;
  date: string;
}
