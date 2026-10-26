import { SectionHeading } from "@/components/shared/SectionHeading";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { ProductCard } from "@/components/home/ProductCard";
import { products } from "@/lib/products";

export const metadata = {
  title: "Our Products | Prime Fresh Oil Mills",
  description:
    "Browse our catalog of edible seeds, oils, and de-oiled cakes available for bulk B2B supply.",
};

export default function ProductsPage() {
  return (
    <section className="bg-background">
      <div className="container px-6 py-16 md:py-24 lg:py-32">
        <SectionHeading
          heading="Our Products"
          subheading="Carefully selected agricultural commodities for bulk procurement and industrial applications."
          className="mb-16"
        />

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
