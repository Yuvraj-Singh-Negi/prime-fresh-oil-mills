export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  inStock: boolean;
}

export interface ProductWithMeta extends Product {
  category: "seeds" | "oilseeds" | "cakes";
}

export const PRODUCT_CATEGORIES = {
  seeds: "Seeds",
  oilseeds: "Oilseeds",
  cakes: "De-oiled Cakes",
} as const;

export const MAX_QUANTITY_MT = 100000;
export const MIN_QUANTITY_MT = 0.001;
export const QUANTITY_STEP = 0.001;
