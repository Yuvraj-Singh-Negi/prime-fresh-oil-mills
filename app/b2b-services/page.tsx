import { SectionHeading } from "@/components/shared/SectionHeading";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "B2B Services | Prime Fresh Oil Mills",
  description:
    "Bulk procurement services for wholesalers, distributors, processors, and industrial buyers.",
};

const services = [
  {
    title: "Bulk Supply",
    body: "Metric-ton quantities for B2B buyers across the region.",
  },
  {
    title: "Processing Tracking",
    body: "Track your order from farm to delivery.",
  },
  {
    title: "Quality Assurance",
    body: "Strict quality control at every step of processing.",
  },
  {
    title: "Direct Sourcing",
    body: "We work directly with farmers and processors.",
  },
];

export default function B2BServicesPage() {
  return (
    <section className="bg-background">
      <div className="container px-6 py-16 md:py-24 lg:py-32">
        <SectionHeading
          heading="B2B Services"
          subheading="Bulk procurement services for wholesalers, distributors, processors, and industrial buyers."
          className="mb-16"
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <RevealOnScroll key={service.title} delay={services.indexOf(service) * 60}>
              <div className="rounded-2xl border border-border bg-surface p-8 hover:shadow-lg transition-all">
                <h4 className="font-semibold text-lg text-foreground mb-2">
                  {service.title}
                </h4>
                <p className="text-sm text-muted-foreground">{service.body}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        <div className="mt-16 md:mt-20">
          <div className="rounded-2xl border border-border bg-background p-8 md:p-12 text-center">
            <h2 className="heading-2 text-3xl md:text-4xl text-foreground mb-4">
              Ready to Place a Bulk Order?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Submit a quotation request for edible seeds, oils, or de-oiled
              cakes in metric-ton quantities.
            </p>
            <Link
              href="/quote-cart"
              className="inline-flex items-center gap-2 rounded-xl bg-gold text-deep px-8 py-4 font-semibold shadow-lg hover:bg-gold-hover transition-colors"
            >
              Get Bulk Quote
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
