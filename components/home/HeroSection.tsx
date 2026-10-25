"use client";

import Image from "next/image";
import { BulkQuoteForm } from "@/components/home/BulkQuoteForm";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden" aria-label="Hero">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/assets/hero-oil.jpg"
          alt="Yellow mustard seeds, the raw material for mustard oil"
          fill
          className="image-cover opacity-70"
          sizes="100vw"
          priority
        />
        {/* Subtle gradient overlay for legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#173F2B]/75 via-[#173F2B]/40 to-transparent" />
      </div>

      <div className="container relative px-6 py-16 md:py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          <div className="lg:pr-8">
            <RevealOnScroll delay={50}>
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-semibold text-gold uppercase tracking-wider">
                Bulk supplier
              </span>
            </RevealOnScroll>

            <RevealOnScroll delay={120}>
              <h1 className="heading-1 mt-4 md:mt-6 text-4xl md:text-5xl lg:text-6xl text-white text-shadow leading-[1.15]">
                Premium Edible{" "}
                <br />
                Seeds, Oils &{" "}
                <br />
                De-oiled Cakes
              </h1>
            </RevealOnScroll>

            <RevealOnScroll delay={180}>
              <p className="mt-6 md:mt-8 text-lg text-white/90 max-w-lg leading-relaxed">
                Quality-focused agricultural commodities for wholesalers,
                distributors, processors, and industrial buyers.
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={240}>
              <div className="mt-10 md:mt-12 flex flex-col sm:flex-row gap-4">
                <Link
                  href="#products"
                  className="flex items-center justify-center gap-2 rounded-xl bg-white text-deep px-7 py-3 font-semibold shadow-lg hover:bg-gold hover:text-deep transition-colors"
                >
                  Explore Products
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Link>
                <a
                  href="/facilities"
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-7 py-3 font-semibold text-white hover:bg-white/20 transition-colors backdrop-blur-sm"
                >
                  View Our Facilities
                  <ArrowLeft className="h-5 w-5" aria-hidden="true" />
                </a>
              </div>
            </RevealOnScroll>
          </div>

          <div className="hidden lg:block">
            <RevealOnScroll delay={100}>
              <div className="glass-panel rounded-2xl p-8 border border-white/20 shadow-2xl">
                <BulkQuoteForm />
              </div>
            </RevealOnScroll>
          </div>
        </div>

        {/* Mobile: form appears after headline/copy, stacked */}
        <RevealOnScroll delay={300} className="lg:hidden mt-12">
          <div className="glass-panel rounded-2xl p-6 border border-white/20 shadow-2xl max-w-md mx-auto">
            <BulkQuoteForm />
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
