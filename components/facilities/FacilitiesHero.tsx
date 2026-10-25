"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";

export function FacilitiesHero() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-background">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/assets/facility-01.jpg"
          alt="Oil processing facility interior"
          fill
          className="image-cover opacity-60"
          sizes="100vw"
          priority
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#173F2B]/70 to-[#173F2B]/30" />
      </div>

      <div className="container relative px-6 py-16 md:py-24 lg:py-32">
        <RevealOnScroll>
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-semibold text-gold uppercase tracking-wider mb-4 block">
              Operations
            </span>
            <h1 className="heading-1 text-4xl md:text-5xl text-white text-shadow leading-[1.2] mb-6">
              Our Facilities
            </h1>
            <p className="text-lg text-white/90 leading-relaxed mb-10">
              Processing, handling, and bulk supply operations built around
              metric-ton procurement for business buyers.
            </p>
            <Link
              href="/quote-cart"
              className="inline-flex items-center gap-2 rounded-xl bg-white text-deep px-7 py-3 font-semibold shadow-lg hover:bg-gold hover:text-deep transition-colors"
            >
              Build Your Quote
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
