import { SectionHeading } from "@/components/shared/SectionHeading";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";

const COMPANY_NAME = "Prime Fresh Oil Mills";
const PHONE = "+91 90572 92529";
const PHONE_TEL = "tel:+919057292529";
const EMAIL = "Puneet2garg@gmail.com";
const LOCATION = "[Factory Address - Placeholder]";

export const metadata = {
  title: "Contact Us | Prime Fresh Oil Mills",
  description:
    "Get in touch with Prime Fresh Oil Mills for bulk procurement inquiries.",
};

export default function ContactPage() {
  return (
    <section className="bg-background">
      <div className="container px-6 py-16 md:py-24 lg:py-32">
        <SectionHeading
          heading="Contact Us"
          subheading="Get in touch for bulk procurement inquiries."
          className="mb-16"
        />

        <div className="grid lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <RevealOnScroll delay={100}>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-secondary shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <h4 className="font-semibold text-foreground">Location</h4>
                    <p className="text-sm text-muted-foreground">
                      {LOCATION}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-secondary shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <h4 className="font-semibold text-foreground">Phone</h4>
                    <p className="text-sm text-muted-foreground">
                      <a href={PHONE_TEL} className="text-gold hover:text-gold-hover transition-colors font-medium">
                        {PHONE}
                      </a>
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-secondary shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <h4 className="font-semibold text-foreground">Email</h4>
                    <p className="text-sm text-muted-foreground">
                      <a href={`mailto:${EMAIL}`} className="text-gold hover:text-gold-hover transition-colors font-medium">
                        {EMAIL}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={180}>
              <div className="rounded-2xl border border-border bg-surface p-8">
                <h4 className="font-semibold text-foreground mb-4">Send a Message</h4>
                <form className="space-y-4" noValidate>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-gold transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-gold transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-gold transition-colors"
                      placeholder="Your message"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-gold text-deep px-6 py-3 font-medium shadow-sm hover:bg-gold-hover transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </RevealOnScroll>
          </div>

          <RevealOnScroll delay={100}>
            <div className="rounded-2xl border border-border bg-surface p-8 md:p-12">
              <h4 className="font-semibold text-foreground mb-6">Visit Our Facilities</h4>
              <div className="relative h-64 md:h-80 rounded-xl overflow-hidden border border-border mb-6">
                <div className="image-cover bg-muted/20 flex items-center justify-center h-full">
                  <span className="text-muted-foreground text-sm font-medium">Facility Map</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gold/10 text-gold flex items-center justify-center">
                    <span className="text-sm font-semibold">🕒</span>
                  </div>
                  <div>
                    <h5 className="font-semibold text-foreground">Business Hours</h5>
                    <p className="text-sm text-muted-foreground">
                      Mon - Sat: 9:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gold/10 text-gold flex items-center justify-center">
                    <span className="text-sm font-semibold">📦</span>
                  </div>
                  <div>
                    <h5 className="font-semibold text-foreground">Bulk Orders</h5>
                    <p className="text-sm text-muted-foreground">
                      Minimum 1 metric ton
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
