"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { Video } from "lucide-react";

const facilityImages = [
  { src: "/assets/facility-01.jpg", label: "Facility view" },
  { src: "/assets/facility-02.jpg", label: "Processing area" },
  { src: "/assets/facility-03.jpg", label: "Storage" },
  { src: "/assets/facility-04.jpg", label: "Packing" },
] as const;

// Genuine local facility footage provided with the challenge assets.
const facilityVideos = [
  {
    src: "/assets/Warehouse_Storage_Bags.mp4",
    label: "Warehouse storage bags",
  },
  {
    src: "/assets/Facility_Oil_Processing_Equipment.mp4",
    label: "Oil processing equipment",
  },
] as const;

interface GalleryItemProps {
  src: string;
  label: string;
  isVideo?: boolean;
  variant: "feature" | "supporting";
}

function GalleryItem({ src, label, isVideo, variant }: GalleryItemProps) {
  const reducedMotion = useReducedMotion() ?? false;
  const controls = variant === "feature" ? { whileHover: { scale: 1.02 } } : {};

  return (
    <div className="group rounded-2xl border border-border bg-surface overflow-hidden flex flex-col">
      <motion.div
        whileHover={reducedMotion ? {} : controls.whileHover}
      >
        <div className="relative h-64 md:h-80 w-full overflow-hidden">
        {isVideo ? (
          <video
            src={src}
            autoPlay
            loop
            muted
            playsInline
            className="image-cover h-full w-full object-cover"
            poster={src.replace(".mp4", ".jpg")}
          />
        ) : (
          <Image
            src={src}
            alt={label}
            fill
            className="image-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 50vw"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#102E20]/60 via-[#102E20]/20 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-0.5 text-xs text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-white" aria-hidden="true" />
            {label}
          </span>
        </div>
      </div>
      {isVideo && (
        <div className="absolute top-3 right-3 bg-black/60 text-white px-2 py-1 rounded text-xs">
          <Video className="h-3 w-3 mr-1" aria-hidden="true" />
          Local footage
        </div>
      )}
      </motion.div>
    </div>
  );
}

function FallbackPanel({ title }: { title: string }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-8 flex flex-col items-center justify-center text-center h-full">
      <div className="h-12 w-12 rounded-full bg-muted/30 flex items-center justify-center mb-3">
        <span className="text-muted-foreground text-xs font-medium">Image</span>
      </div>
      <p className="text-sm text-muted-foreground font-medium">{title}</p>
      <p className="text-xs text-muted-foreground/60 mt-1">
        Local asset to be provided
      </p>
    </div>
  );
}

export function FacilityGallery() {
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <section className="section">
      <div className="container">
        <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
          {/* Feature: first facility image slot (fallback until provided) */}
          <RevealOnScroll delay={60}>
            <div className="rounded-2xl border border-border bg-surface p-8 flex flex-col items-center justify-center text-center h-full">
              <motion.div
                whileHover={reducedMotion ? {} : { scale: 1.02 }}
              >
                <div className="h-20 w-20 rounded-full bg-muted/20 flex items-center justify-center mb-4">
                <span className="text-muted-foreground text-lg font-semibold">F</span>
              </div>
              <h3 className="font-semibold text-foreground">Processing Facility</h3>
              <p className="text-sm text-muted-foreground mt-2 max-w-xs text-center">
                Local facility photography to be provided.
              </p>
              </motion.div>
            </div>
          </RevealOnScroll>

          {/* Supporting: warehouse storage video (genuine local asset) */}
          <RevealOnScroll delay={120}>
            <GalleryItem
              src={facilityVideos[0].src}
              label={facilityVideos[0].label}
              isVideo
              variant="supporting"
            />
          </RevealOnScroll>

          {/* Supporting: oil processing equipment video (genuine local asset) */}
          <RevealOnScroll delay={180}>
            <GalleryItem
              src={facilityVideos[1].src}
              label={facilityVideos[1].label}
              isVideo
              variant="supporting"
            />
          </RevealOnScroll>

          {/* Additional: facility image slot (fallback until provided) */}
          <RevealOnScroll delay={240}>
            <FallbackPanel title="Storage & Packing" />
          </RevealOnScroll>
        </div>

        <div className="mt-10 md:mt-14 text-center text-sm text-muted-foreground">
          Facility imagery and footage shown are the assets provided with the
          challenge. Additional facility photos can be dropped into
          <code className="text-gold font-mono">/public/assets/facility-01.jpg through facility-04.jpg</code>
          as they become available.
        </div>
      </div>
    </section>
  );
}
