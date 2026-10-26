import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { Shield, Truck, Users, Menu } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Pure & Natural",
    body: "No added chemicals or preservatives",
  },
  {
    icon: Shield,
    title: "Quality Assured",
    body: "Strict quality control at every step",
  },
  {
    icon: Truck,
    title: "Bulk Supply",
    body: "Reliable & timely delivery",
  },
  {
    icon: Users,
    title: "B2B Partnerships",
    body: "Long-term business relationships",
  },
];

export function TrustBanner() {
  return (
    <section className="bg-background py-16 md:py-24 border-t border-border">
      <div className="container px-6">
        <RevealOnScroll delay={100}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {features.map((feature, idx) => (
              <div key={feature.title} className="flex flex-col items-center text-center">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-green-600 mb-4">
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
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
