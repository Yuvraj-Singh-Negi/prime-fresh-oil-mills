import Image from "next/image";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";

export const metadata = {
  title: "About Us | Prime Fresh Oil Mills",
  description:
    "Learn about Prime Fresh Oil Mills, a trusted bulk supplier of edible seeds, oils, and de-oiled cakes.",
};

export default function AboutPage() {
  return (
    <section className="bg-background">
      <div className="container px-6 py-16 md:py-24 lg:py-32">
        <SectionHeading
          heading="About Us"
          subheading="Direct from the source. B2B bulk orders & processing tracking."
          className="mb-16"
        />

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <ImageSection />
          </div>
          <div className="space-y-8">
            <RevealOnScroll delay={100}>
              <div className="space-y-4">
                <h2 className="heading-2 text-3xl md:text-4xl text-foreground">
                  Our Story
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Prime Fresh Oil Mills is a trusted name in the agricultural
                  commodities sector, specializing in bulk supply of premium
                  edible seeds, oils, and de-oiled cakes.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We work directly with farmers and processors to deliver
                  consistent quality at scale, serving wholesalers, distributors,
                  processors, and industrial buyers across the region.
                </p>
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={180}>
              <div className="grid gap-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
                    <span className="text-sm font-semibold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Bulk Supply</h4>
                    <p className="text-sm text-muted-foreground">
                      Metric-ton quantities for B2B buyers
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
                    <span className="text-sm font-semibold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Quality Focus</h4>
                    <p className="text-sm text-muted-foreground">
                      Strict quality control at every step
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
                    <span className="text-sm font-semibold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">B2B Partnerships</h4>
                    <p className="text-sm text-muted-foreground">
                      Long-term business relationships
                    </p>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}

function ImageSection() {
  return (
    <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden border border-border">
      <Image
        src="/assets/groundnut.jpg"
        alt="Groundnut seeds"
        fill
        className="image-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
        priority={false}
      />
      <div className="absolute bottom-6 left-6 right-6">
        <div className="bg-surface/90 backdrop-blur px-4 py-3 rounded-xl border border-border">
          <h4 className="font-semibold text-foreground">Groundnut Seeds</h4>
          <p className="text-sm text-muted-foreground">
            Bulk B2B supply — price on request
          </p>
        </div>
      </div>
    </div>
  );
}
