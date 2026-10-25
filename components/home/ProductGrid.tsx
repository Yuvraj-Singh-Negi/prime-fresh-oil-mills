import { SectionHeading } from "@/components/shared/SectionHeading";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { ProductCard } from "@/components/home/ProductCard";
import { products } from "@/lib/products";

export function ProductGrid() {
  return (
    <section id="products" className="section bg-background">
      <div className="container">
        <SectionHeading
          heading="Our Products"
          subheading="Carefully selected agricultural commodities for bulk procurement and industrial applications."
        />
        <div className="mt-16 lg:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
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
