import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

const COMPANY_NAME = "Prime Fresh Oil Mills";
const PHONE = "+91 90572 92529";
const PHONE_TEL = "tel:+919057292529";
const EMAIL = "Puneet2garg@gmail.com";
const LOCATION = "[Factory Address - Placeholder]";

const socialLinks = [
  { href: "#", icon: Facebook, label: "Facebook" },
  { href: "#", icon: Instagram, label: "Instagram" },
  { href: "#", icon: Linkedin, label: "LinkedIn" },
  { href: "#", icon: Youtube, label: "YouTube" },
];

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-deep text-surface mt-auto">
      <div className="container px-6 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-8 w-8 rounded-full bg-gold flex items-center justify-center text-deep font-bold text-sm">
                P
              </div>
              <span className="font-serif font-bold text-xl tracking-tight text-surface">
                {COMPANY_NAME}
              </span>
            </div>
            <p className="text-sm text-muted-foreground/80 max-w-xs leading-relaxed mb-6">
              Bulk supplier of edible seeds, oils, and de-oiled seed cakes for
              wholesalers, distributors, and industrial buyers.
            </p>
            <div className="flex items-center gap-6">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-muted-foreground/60 hover:text-surface transition-colors"
                  aria-label={link.label}
                >
                  <link.icon className="h-5 w-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-surface tracking-wider uppercase mb-6">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-muted-foreground/80">
                <Phone className="h-5 w-5 shrink-0 mt-0.5 text-secondary" aria-hidden="true" />
                <span>
                  Phone: <a href={PHONE_TEL} className="text-surface hover:text-gold transition-colors font-medium">
                    {PHONE}
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground/80">
                <Mail className="h-5 w-5 shrink-0 mt-0.5 text-secondary" aria-hidden="true" />
                <span>
                  Email:{" "}
                  <a
                    href={`mailto:${EMAIL}`}
                    className="text-surface hover:text-gold transition-colors font-medium"
                  >
                    {EMAIL}
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground/80">
                <MapPin className="h-5 w-5 shrink-0 mt-0.5 text-secondary" aria-hidden="true" />
                <span>Location: {LOCATION}</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-surface tracking-wider uppercase mb-6">
              Quick Links
            </h3>
            <ul className="space-y-4">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About Us" },
                { href: "/products", label: "Our Products" },
                { href: "/facility-tour", label: "Facility Tour" },
                { href: "/b2b-services", label: "B2B Services" },
                { href: "/contact", label: "Contact Us" },
                { href: "/quote-cart", label: "Quote Cart" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground/80 hover:text-surface transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border/30 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3 text-xs text-muted-foreground/60">
            <span>© {year} {COMPANY_NAME}.</span>
            <span>All rights reserved.</span>
          </div>
          <p className="text-xs text-muted-foreground/60">
            Frontend demo — RFQ submission is simulated; no data is transmitted.
          </p>
        </div>
      </div>

      {/* Bottom section from prototype */}
      <div className="border-t border-border bg-background py-16 md:py-24">
        <div className="container px-6">
          <div className="flex flex-col lg:flex-row gap-12 items-start lg:items-center">
            <div className="flex-shrink-0">
              <Link
                href="/products"
                className="inline-flex items-center gap-1 font-medium text-gold hover:text-gold-hover transition-colors mb-4 block"
              >
                Our Products
              </Link>
              <h2 className="heading-2 text-3xl md:text-4xl text-foreground leading-tight mb-6">
                Premium Quality, Naturally Processed
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                Direct from the source. B2B bulk orders & processing tracking.
              </p>
            </div>
            <div className="flex-grow">
              <Image
                src="/assets/hero-oil.jpg"
                alt="Mustard seeds and oil"
                fill
                className="image-cover rounded-2xl"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={false}
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
