"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useQuoteCart } from "@/components/quote/QuoteCartProvider";
import type { Product } from "@/types/product";
import { getProductById } from "@/lib/products";

interface QuoteCartItemProps {
  item: { productId: string; quantity: number };
}

export function QuoteCartItem({ item }: QuoteCartItemProps) {
  const { updateQuantity, removeItem } = useQuoteCart();
  const product = getProductById(item.productId);

  const increase = () => {
    const next = Math.min(item.quantity + 1, 100000);
    updateQuantity(item.productId, next);
  };
  const decrease = () => {
    const next = Math.max(item.quantity - 1, 0.001);
    updateQuantity(item.productId, next);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const parsed = Number(e.target.value);
    if (!Number.isFinite(parsed) || parsed < 0.001) {
      updateQuantity(item.productId, item.quantity);
    } else if (parsed > 100000) {
      updateQuantity(item.productId, 100000);
    } else {
      updateQuantity(item.productId, parsed);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") (e.target as HTMLInputElement).blur();
  };

  return (
    <div className="rounded-2xl border border-border bg-surface p-5 md:p-6 transition-all">
      <div className="flex flex-col md:flex-row gap-5 items-start md:items-center">
        <div className="relative h-32 md:h-40 w-full md:w-40 flex-shrink-0 overflow-hidden rounded-xl border border-border">
          {product ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="image-cover"
              sizes="(max-width: 768px) 120px, 160px"
            />
          ) : (
            <div className="image-cover bg-muted/20" />
          )}
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex items-baseline gap-3">
            <h4 className="font-semibold text-lg text-foreground">{product?.name ?? item.productId}</h4>
            <span className="text-sm font-medium text-success">In Stock</span>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product?.description ?? ""}
          </p>
        </div>

        <div className="flex items-center gap-3 md:ml-auto">
          <button
            onClick={decrease}
            disabled={item.quantity <= 0.001}
            className="w-10 h-10 rounded-xl border border-border bg-background flex items-center justify-center text-sm font-medium text-foreground hover:bg-gold hover:text-gold-foreground disabled:opacity-50 transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus className="h-4 w-4" aria-hidden="true" />
          </button>
          <input
            type="text"
            value={item.quantity % 1 === 0 ? item.quantity.toString() : item.quantity.toFixed(3)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="w-18 rounded-xl border border-border bg-surface px-3 py-2 text-sm text-center text-foreground focus:outline-none focus:ring-2 focus:ring-gold transition-colors"
            inputMode="decimal"
          />
          <button
            onClick={increase}
            className="w-10 h-10 rounded-xl border border-border bg-background flex items-center justify-center text-sm font-medium text-foreground hover:bg-gold hover:text-gold-foreground transition-colors"
            aria-label="Increase quantity"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            onClick={() => removeItem(item.productId)}
            className="ml-3 p-2 rounded-xl border border-border bg-background text-muted-foreground hover:text-destructive hover:border-destructive/50 transition-colors"
            aria-label="Remove item"
          >
            <Trash2 className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
