
// Types for the Tour Der Wang delivery application

export type User = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  addresses: Address[];
  isOverseasWorker?: boolean;
  preferredPaymentMethod?: string;
};

export type Address = {
  id: string;
  userId: string;
  name: string; // E.g., "Home", "Work", "Mom's house"
  street: string;
  district: string;
  province: string;
  postalCode: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  instructions?: string;
};

export type Restaurant = {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  deliveryTime: string; // E.g., "30-45 min"
  deliveryFee: number;
  minOrder: number;
  isOpen: boolean;
  categories: string[];
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  selfDelivery: boolean;
};

export type MenuItem = {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  image?: string;
  price: number;
  category: string;
  popular?: boolean;
  options?: MenuItemOption[];
};

export type MenuItemOption = {
  name: string;
  choices: {
    name: string;
    price?: number;
  }[];
  required: boolean;
  multiSelect: boolean;
};

export type CartItem = {
  item: MenuItem;
  quantity: number;
  specialInstructions?: string;
  selectedOptions?: {
    [key: string]: string | string[];
  };
};

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'ready'
  | 'delivering'
  | 'delivered'
  | 'completed'
  | 'cancelled';

export type PaymentMethod = 
  | 'promptpay'
  | 'banking'
  | 'credit_card'
  | 'paypal'
  | 'cash';

export type PaymentStatus = 
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed';

export type OrderType =
  | 'delivery'
  | 'pickup';

export type Order = {
  id: string;
  userId: string;
  restaurantId: string;
  items: CartItem[];
  status: OrderStatus;
  orderType: OrderType;
  createdAt: string;
  updatedAt: string;
  deliveryAddress?: Address;
  deliveryTime?: string;
  total: number;
  subtotal: number;
  deliveryFee: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  specialInstructions?: string;
  recipientName?: string; // For overseas workers ordering for family
  recipientPhone?: string;
};
