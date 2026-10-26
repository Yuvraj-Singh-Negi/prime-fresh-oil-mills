"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import { useQuoteCart } from "@/components/quote/QuoteCartProvider";
import { useToasts } from "@/components/quote/ToastBridge";
import type { Product } from "@/types/product";
import { formatMetricTons } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useQuoteCart();
  const { addToast } = useToasts();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem(product.id, 1);
    setAdded(true);
    addToast("success", `${product.name} added to your quote.`);
    setTimeout(() => setAdded(false), 1200);
  }

  return (
    <article className="group rounded-2xl border border-border bg-surface overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="image-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 25vw, 20vw"
          priority={false}
        />
        <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-success text-success-foreground px-2.5 py-0.5 text-xs font-semibold shadow-sm">
          {product.inStock ? "●" : ""} In Stock
        </span>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-sans font-semibold text-lg text-foreground leading-snug">
              {product.name}
              {product.subtitle && (
                <span className="ml-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {product.subtitle}
                </span>
              )}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {product.description}
            </p>
          </div>
          {added && (
            <span className="flex-shrink-0 h-5 w-5 rounded-full bg-success text-success-foreground flex items-center justify-center">
              <span className="text-[9px] font-bold">✓</span>
            </span>
          )}
        </div>
        <button
          onClick={handleAdd}
          disabled={added}
          className="w-full mt-5 flex items-center justify-center gap-2 rounded-xl border border-gold/40 bg-gold/5 px-4 py-2.5 text-sm font-medium text-gold transition-all hover:bg-gold hover:text-gold-foreground disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          {added ? "Added" : "Request Quote"}
        </button>
      </div>
    </article>
  );
}
