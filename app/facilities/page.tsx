import { FacilitiesHero } from "@/components/facilities/FacilitiesHero";
import { FacilityGallery } from "@/components/facilities/FacilityGallery";
import { SectionHeading } from "@/components/shared/SectionHeading";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";

export const metadata = {
  title: "Our Facilities | Prime Fresh Oil Mills",
  description:
    "Processing, handling, and bulk supply operations at Prime Fresh Oil Mills.",
};

export default function FacilitiesPage() {
  return (
    <>
      <FacilitiesHero />
      <FacilityGallery />
      <RevealOnScroll delay={200}>
        <section className="section bg-surface">
          <div className="container">
            <div className="rounded-2xl border border-border bg-background p-8 md:p-12 text-center">
              <SectionHeading
                heading="Looking for a Reliable Bulk Supply Partner?"
                subheading="Submit a quotation request for edible seeds, oils, or de-oiled cakes in metric-ton quantities."
                className="mb-8"
              />
              <Link
                href="/quote-cart"
                className="inline-flex items-center gap-2 rounded-xl bg-gold text-gold-foreground px-8 py-4 font-semibold shadow-lg hover:bg-gold-hover transition-colors"
              >
                Build Your Quote
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </RevealOnScroll>
    </>
  );
}
