import Image from "next/image";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Facility Tour | Prime Fresh Oil Mills",
  description:
    "Processing, handling, and bulk supply operations at Prime Fresh Oil Mills.",
};

export default function FacilityTourPage() {
  return (
    <section className="bg-background">
      <div className="container px-6 py-16 md:py-24 lg:py-32">
        <SectionHeading
          heading="Facility Tour"
          subheading="Processing, handling, and bulk supply operations built around metric-ton procurement."
          className="mb-16"
        />

        <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
          <RevealOnScroll delay={60}>
            <FacilityCard
              title="Processing Facility"
              subtitle="Local facility photography to be provided."
            />
          </RevealOnScroll>
          <RevealOnScroll delay={120}>
            <FacilityCard
              title="Warehouse Storage Bags"
              isVideo
              src="/assets/Warehouse_Storage_Bags.mp4"
            />
          </RevealOnScroll>
          <RevealOnScroll delay={180}>
            <FacilityCard
              title="Oil Processing Equipment"
              isVideo
              src="/assets/Facility_Oil_Processing_Equipment.mp4"
            />
          </RevealOnScroll>
          <RevealOnScroll delay={240}>
            <FacilityCard
              title="Storage & Packing"
              subtitle="Local asset to be provided."
            />
          </RevealOnScroll>
        </div>

        <div className="mt-16 md:mt-20">
          <div className="rounded-2xl border border-border bg-background p-8 md:p-12 text-center">
            <SectionHeading
              heading="Looking for a Reliable Bulk Supply Partner?"
              subheading="Submit a quotation request for edible seeds, oils, or de-oiled cakes in metric-ton quantities."
              className="mb-8"
            />
            <Link
              href="/quote-cart"
              className="inline-flex items-center gap-2 rounded-xl bg-gold text-deep px-8 py-4 font-semibold shadow-lg hover:bg-gold-hover transition-colors"
            >
              Build Your Quote
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function FacilityCard({ title, subtitle, isVideo, src }: { title: string; subtitle?: string; isVideo?: boolean; src?: string }) {
  return (
    <div className="rounded-2xl border border-border bg-surface overflow-hidden flex flex-col h-full">
      <div className="relative h-64 md:h-80 w-full overflow-hidden">
        {isVideo && src ? (
          <video
            src={src}
            autoPlay
            loop
            muted
            playsInline
            className="image-cover h-full w-full object-cover"
          />
        ) : (
          <div className="image-cover bg-muted/20 flex items-center justify-center">
            <span className="text-muted-foreground text-sm font-medium">Image</span>
          </div>
        )}
        <div className="absolute bottom-3 left-3 right-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-0.5 text-xs text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-white" aria-hidden="true" />
            {title}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h4 className="font-semibold text-foreground">{title}</h4>
        {subtitle && (
          <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
