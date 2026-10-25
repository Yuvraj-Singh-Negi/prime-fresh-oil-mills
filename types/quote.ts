export interface QuoteCartItem {
  productId: string;
  quantity: number;
}

export interface QuoteSnapshot {
  referenceId: string;
  submittedAt: string;
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
  }>;
  totalMetricTons: number;
}

export interface QuoteCartContextValue {
  items: QuoteCartItem[];
  itemCount: number;
  totalMetricTons: number;
  addItem: (productId: string, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
}

export const CART_STORAGE_KEY = "prime-fresh-oil-mills:quote-cart:v1";
export const MOCK_REF_PREFIX = "PFO-2026";
