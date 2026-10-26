"use client";

import { SectionHeading } from "@/components/shared/SectionHeading";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { ProductCard } from "@/components/home/ProductCard";
import { products } from "@/lib/products";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function ProductGrid() {
  return (
    <section id="products" className="bg-background">
      <div className="container px-6 py-16 md:py-24 lg:py-32">
        <SectionHeading
          heading="Bestsellers & Raw Materials Product Grid"
          subheading=""
          className="mb-16"
        />
        <div className="flex justify-between items-end mb-10">
          <div className="hidden md:block" />
          <Link
            href="/products"
            className="inline-flex items-center gap-1 font-medium text-gold hover:text-gold-hover transition-colors"
          >
            View All Products
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-5">
          {products.map((product) => (
            <RevealOnScroll key={product.id} delay={products.indexOf(product) * 60}>
              <ProductCard product={product} />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
