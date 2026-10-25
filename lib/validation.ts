import type { Product } from "@/types/product";
import { MAX_QUANTITY_MT, MIN_QUANTITY_MT } from "@/types/product";
import { products } from "@/lib/products";

export interface ValidationError {
  field: string;
  message: string;
}

export function validateQuantity(value: unknown): { valid: boolean; errors: ValidationError[]; parsed?: number } {
  const errors: ValidationError[] = [];

  if (value === null || value === undefined || value === "") {
    return { valid: false, errors: [{ field: "quantity", message: "Quantity is required." }] };
  }

  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    return {
      valid: false,
      errors: [{ field: "quantity", message: "Enter a valid numeric quantity." }],
    };
  }

  if (!Number.isFinite(parsed) || parsed < MIN_QUANTITY_MT) {
    return {
      valid: false,
      errors: [{ field: "quantity", message: `Quantity must be at least ${MIN_QUANTITY_MT} metric ton.` }],
    };
  }

  if (parsed > MAX_QUANTITY_MT) {
    return {
      valid: false,
      errors: [{ field: "quantity", message: `Quantity cannot exceed ${MAX_QUANTITY_MT.toLocaleString()} metric tons.` }],
    };
  }

  // Support up to three decimal places.
  const decimals = (parsed.toString().split(".")[1] || "").length;
  if (decimals > 3) {
    return {
      valid: false,
      errors: [{ field: "quantity", message: "Quantity supports up to three decimal places." }],
    };
  }

  return { valid: true, errors: [], parsed };
}

export function validateProductSelection(productId: string): { valid: boolean; errors: ValidationError[] } {
  const errors: ValidationError[] = [];
  if (!productId || !getProductById(productId)) {
    errors.push({ field: "product", message: "Please select a valid product." });
  }
  return { valid: errors.length === 0, errors };
}

function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function isValidQuantity(value: number): boolean {
  return Number.isFinite(value) && value >= MIN_QUANTITY_MT && value <= MAX_QUANTITY_MT;
}
