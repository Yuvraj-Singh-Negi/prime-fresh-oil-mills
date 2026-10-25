import type { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "groundnut-seeds",
    name: "Groundnut Seeds",
    description: "Bold, clean groundnut kernels suited for oil extraction and direct bulk procurement.",
    image: "/assets/groundnut.jpg",
    inStock: true,
  },
  {
    id: "sesame-seeds",
    name: "Sesame Seeds",
    description: "White sesame seeds, carefully selected for bulk culinary and industrial applications.",
    image: "/assets/sesame.jpg",
    inStock: true,
  },
  {
    id: "deoiled-cakes",
    name: "De-Oiled Cakes",
    description: "Nutrient-rich de-oiled seed cakes, a by-product of oil pressing suitable for feed and industrial use.",
    image: "/assets/deoiled-cake.jpg",
    inStock: true,
  },
  {
    id: "yellow-mustard-seeds",
    name: "Yellow Mustard Seeds",
    description: "Yellow mustard seeds — the source of our bestselling yellow mustard oil — supplied in bulk metric tons.",
    image: "/assets/mustard.jpg",
    inStock: true,
  },
  {
    id: "seed-cakes",
    name: "Seed Cakes",
    description: "Pressed seed cakes from multiple oilseeds, available in bulk for agricultural and industrial buyers.",
    image: "/assets/seed-cake.jpg",
    inStock: true,
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
