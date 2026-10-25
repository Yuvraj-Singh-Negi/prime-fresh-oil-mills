import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { formatMetricTons } from "@/lib/utils";

const COMPANY_NAME = "Prime Fresh Oil Mills";
const PHONE = "+91 90572 92529";
const PHONE_TEL = "tel:+919057292529";
const EMAIL = "Puneet2garg@gmail.com";
const LOCATION = "[Factory Address - Placeholder]";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/facilities", label: "Facilities" },
  { href: "/quote-cart", label: "Bulk Quote Cart" },
];

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-deep text-surface mt-auto">
      <div className="container px-4 mx-auto py-10 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-6 w-6 rounded-full bg-gold flex items-center justify-center text-deep font-bold text-xs">
                P
              </div>
              <span className="font-serif font-bold text-xl tracking-tight text-surface">
                {COMPANY_NAME}
              </span>
            </div>
            <p className="text-sm text-muted-foreground/80 max-w-xs leading-relaxed">
              Bulk supplier of edible seeds, oils, and de-oiled seed cakes for
              wholesalers, distributors, and industrial buyers.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-surface tracking-wider uppercase mb-6">
              Quick links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
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

          <div>
            <h3 className="text-sm font-semibold text-surface tracking-wider uppercase mb-6">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-muted-foreground/80">
                <MapPin className="h-5 w-5 shrink-0 mt-0.5 text-secondary" aria-hidden="true" />
                <span>{LOCATION}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-secondary" aria-hidden="true" />
                <a
                  href={PHONE_TEL}
                  className="text-sm text-surface hover:text-gold transition-colors font-medium"
                >
                  {PHONE}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-secondary" aria-hidden="true" />
                <a
                  href={`mailto:${EMAIL}`}
                  className="text-sm text-surface hover:text-gold transition-colors font-medium"
                >
                  {EMAIL}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/30 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground/60">
            © {year} {COMPANY_NAME}. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground/60">
            Frontend demo — RFQ submission is simulated; no data is transmitted.
          </p>
        </div>
      </div>
    </footer>
  );
}
