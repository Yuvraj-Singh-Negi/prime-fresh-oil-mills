import type { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "groundnut-seeds",
    name: "Groundnut Seeds",
    subtitle: "(B2B Bulk)",
    description: "Bulk pricing available / Price on Request",
    image: "/assets/groundnut.jpg",
    inStock: true,
  },
  {
    id: "sesame-seeds",
    name: "Sesame Seeds",
    subtitle: "(Black & White)",
    description: "Bulk pricing available / Price on Request",
    image: "/assets/sesame.jpg",
    inStock: true,
  },
  {
    id: "deoiled-cakes",
    name: "De-Oiled Cakes",
    subtitle: "(Cattle Feed)",
    description: "Bulk pricing available / Price on Request",
    image: "/assets/deoiled-cake.jpg",
    inStock: true,
  },
  {
    id: "yellow-mustard-seeds",
    name: "Yellow Mustard Seeds",
    description: "Bulk pricing available / Price on Request",
    image: "/assets/mustard.jpg",
    inStock: true,
  },
  {
    id: "seed-cakes",
    name: "Seed Cakes",
    subtitle: "(Organic)",
    description: "Bulk pricing available / Price on Request",
    image: "/assets/seed-cake.jpg",
    inStock: true,
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
