import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { ShieldCheck, Truck, Package } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Pure & Natural",
    body: "Agricultural commodities selected for practical sourcing needs.",
  },
  {
    icon: Truck,
    title: "Quality Assured",
    body: "A quality-focused approach to product selection and supply.",
  },
  {
    icon: Package,
    title: "Bulk Supply",
    body: "Quote requests designed around metric-ton purchasing.",
  },
  {
    icon: Truck,
    title: "B2B Partnerships",
    body: "A straightforward procurement experience for business buyers.",
  },
];

export function TrustBanner() {
  return (
    <section className="border-t border-border bg-primary py-12 md:py-16 text-surface">
      <div className="container">
        <RevealOnScroll delay={100}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div key={feature.title} className="text-center">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold mb-4">
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="font-semibold text-lg text-surface mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground/80 leading-relaxed max-w-xs mx-auto">
                  {feature.body}
                </p>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
