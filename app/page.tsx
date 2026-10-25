import { HeroSection } from "@/components/home/HeroSection";
import { ProductGrid } from "@/components/home/ProductGrid";
import { TrustBanner } from "@/components/home/TrustBanner";

export const metadata = {
  title: "Prime Fresh Oil Mills | Premium Edible Seeds & Oils",
  description:
    "Explore bulk edible seeds, oils, and de-oiled cakes from Prime Fresh Oil Mills. Prepare a quotation request for your business procurement needs.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProductGrid />
      <TrustBanner />
    </>
  );
}
