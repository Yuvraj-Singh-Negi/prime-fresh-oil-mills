"use client";

import Image from "next/image";
import Link from "next/link";
import { BulkQuoteForm } from "@/components/home/BulkQuoteForm";
import { ArrowRight } from "lucide-react";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden" aria-label="Hero">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/assets/hero-oil.jpg"
          alt="Yellow mustard oil being poured into a glass"
          fill
          className="image-cover opacity-90"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-[#102E20]/85" />
      </div>

      <div className="container relative px-6 py-16 md:py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          <div className="lg:pr-8">
            <RevealOnScroll delay={50}>
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-semibold text-gold uppercase tracking-wider mb-4 block">
                Bestseller
              </span>
            </RevealOnScroll>

            <RevealOnScroll delay={120}>
              <h1 className="heading-1 mt-4 md:mt-6 text-4xl md:text-5xl lg:text-6xl text-white text-shadow leading-[1.15] mb-6">
                Premium Edible Seeds,{" "}
                <br />
                Oils & De-oiled Cakes
              </h1>
            </RevealOnScroll>

            <RevealOnScroll delay={180}>
              <p className="mt-6 md:mt-8 text-lg text-white/90 max-w-lg leading-relaxed">
                Direct from the source. B2B bulk orders & processing tracking.
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={240}>
              <div className="mt-10 md:mt-12 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/quote-cart"
                  className="flex items-center justify-center gap-2 rounded-xl bg-gold text-deep px-7 py-3 font-semibold shadow-lg hover:bg-gold-hover transition-colors"
                >
                  Start Bulk Order
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Link>
                <a
                  href="/facilities"
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-7 py-3 font-semibold text-white hover:bg-white/20 transition-colors backdrop-blur-sm"
                >
                  View Our Facilities
                </a>
              </div>
            </RevealOnScroll>
          </div>

          <div className="hidden lg:block">
            <RevealOnScroll delay={100}>
              <div className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-sm">
                <BulkQuoteForm />
              </div>
            </RevealOnScroll>
          </div>

          {/* Mobile: form appears after headline/copy, stacked */}
          <RevealOnScroll delay={300} className="lg:hidden mt-12">
            <div className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-sm max-w-md mx-auto">
              <BulkQuoteForm />
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
