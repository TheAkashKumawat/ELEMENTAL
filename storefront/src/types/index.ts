export type CategoryHandle = 'apparel' | 'footwear' | 'accessories' | 'home';

export interface ProductCategory {
  id: string;
  name: string;
  handle: CategoryHandle;
  description: string;
  image: string;
  productCount: number;
}

export interface ProductVariant {
  id: string;
  title: string;
  sku: string;
  price: number; // in INR (₹)
  originalPrice?: number;
  inventoryQuantity: number;
  options: {
    color?: string;
    size?: string;
    finish?: string;
    fragrance?: string;
  };
  colorHex?: string;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number; // 1-5
  date: string;
  title: string;
  content: string;
  verified: boolean;
  helpfulCount: number;
}

export interface Product {
  id: string;
  title: string;
  handle: string;
  subtitle: string;
  description: string;
  details: string[];
  materials: string[];
  careInstructions: string[];
  category: CategoryHandle;
  categoryName: string;
  price: number; // in INR
  originalPrice?: number;
  images: string[];
  thumbnail: string;
  variants: ProductVariant[];
  availableColors?: { name: string; hex: string }[];
  availableSizes?: string[];
  rating: number;
  reviewCount: number;
  reviews: ProductReview[];
  tags: string[];
  isFeatured?: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  isSale?: boolean;
  createdAt: string;
}

export interface CartItem {
  id: string;
  productId: string;
  variantId: string;
  title: string;
  variantTitle: string;
  handle: string;
  thumbnail: string;
  price: number; // in INR
  quantity: number;
  maxStock: number;
  color?: string;
  size?: string;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address1: string; // Flat/Building & Street
  address2?: string; // Landmark / Area
  city: string;
  state: string; // Indian State / UT
  pinCode: string; // 6-digit Indian PIN code
  country: string;
  province?: string; // fallback alias
  postalCode?: string; // fallback alias
}

export interface ShippingOption {
  id: string;
  name: string;
  description: string;
  price: number; // in INR
  estimatedDays: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  title: string;
  variantTitle: string;
  thumbnail: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  paymentStatus: 'paid' | 'awaiting' | 'failed';
  items: OrderItem[];
  subtotal: number;
  shippingTotal: number;
  taxTotal: number; // GST
  discountTotal: number;
  total: number;
  shippingAddress: ShippingAddress;
  shippingOption: ShippingOption;
  trackingNumber?: string;
  estimatedDelivery: string;
}

export interface CustomerUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  savedAddresses: (ShippingAddress & { id: string; isDefault: boolean })[];
}
