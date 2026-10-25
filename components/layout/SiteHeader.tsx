"use client";

import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X, ShoppingCart, Layers } from "lucide-react";
import Image from "next/image";
import { useQuoteCart } from "@/components/quote/QuoteCartProvider";

interface LogoFallbackProps {
  className?: string;
}

function LogoFallback({ className }: LogoFallbackProps) {
  return (
    <div
      className={[
        "flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-1.5",
        className,
      ].filter(Boolean).join(" ")}
    >
      <div className="h-6 w-6 rounded-full bg-gold flex items-center justify-center text-primary font-bold text-xs">
        P
      </div>
      <span className="font-serif font-bold text-xl tracking-tight text-foreground">
        Prime Fresh Oil Mills
      </span>
    </div>
  );
}

function Logo({ className }: { className?: string }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div className="relative">
      {!imageFailed && (
        <Image
          src="/assets/logo.png"
          alt="Prime Fresh Oil Mills logo"
          width={200}
          height={200}
          priority
          className={["h-10 w-auto object-contain", className].filter(Boolean).join(" ")}
          onError={() => setImageFailed(true)}
        />
      )}
      {imageFailed && <LogoFallback className={className} />}
    </div>
  );
}

export function SiteHeader() {
  const { itemCount } = useQuoteCart();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion() ?? false;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = useCallback(() => setIsOpen(false), []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/facilities", label: "Facilities" },
    { href: "/quote-cart", label: "Quote Cart" },
  ];

  return (
    <header className="sticky top-0 z-40">
      <div
        className={[
          "relative w-full border-b border-border/60 bg-surface/80 backdrop-blur-md backdrop-blur-[saturate(180%)] transition-colors",
          scrolled ? "shadow-sm" : "",
        ].filter(Boolean).join(" ")}
      >
        <div className="container px-4 mx-auto">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <Logo />
              </div>
              <span className="hidden sm:block font-serif font-bold text-xl tracking-tight text-foreground group-hover:text-gold transition-colors">
                Prime Fresh Oil Mills
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-foreground transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/quote-cart"
                className="flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-gold hover:text-gold-foreground group"
              >
                <ShoppingCart className="h-4 w-4 group-hover:text-gold-foreground" aria-hidden="true" />
                <span>Quote Cart</span>
                {itemCount > 0 && (
                  <span className="ml-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-gold text-gold-foreground text-[10px] font-bold">
                    {itemCount}
                  </span>
                )}
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/quote-cart"
                className="hidden md:flex items-center gap-2 rounded-xl bg-gold text-gold-foreground px-5 py-2 font-medium shadow-sm hover:bg-gold-hover transition-colors"
              >
                <Layers className="h-4 w-4" aria-hidden="true" />
                Request a Quote
              </Link>
              <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="md:hidden p-2 rounded-lg text-foreground hover:bg-muted/50 transition-colors"
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                aria-label="Toggle navigation menu"
              >
                {isOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

        <AnimatePresence mode="wait">
          {isOpen && (
            <div className="md:hidden border-t border-border/60 bg-surface">
              <motion.div
                ref={menuRef}
                initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                animate={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                exit={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                aria-label="Mobile navigation menu"
              >
                <div className="container px-4 mx-auto py-4 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className="block px-4 py-3 rounded-xl text-foreground hover:bg-gold/10 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="px-4 py-3 border border-border rounded-lg bg-background">
                  <Link
                    href="/quote-cart"
                    onClick={closeMenu}
                    className="flex items-center gap-2 w-full rounded-lg border border-gold/30 bg-gold/5 text-gold-foreground px-3 py-2 font-medium text-sm transition-colors hover:bg-gold/10"
                  >
                    <ShoppingCart className="h-4 w-4" aria-hidden="true" />
                    Quote Cart ({itemCount})
                    {itemCount > 0 && (
                      <span className="ml-auto inline-flex h-5 w-5 items-center justify-center rounded-full bg-gold text-gold-foreground text-[10px] font-bold">
                        {itemCount}
                      </span>
                    )}
                  </Link>
                </div>
                <Link
                  href="/quote-cart"
                  onClick={closeMenu}
                  className="w-full rounded-xl bg-gold text-gold-foreground px-4 py-3 font-medium text-center shadow-sm hover:bg-gold-hover transition-colors"
                >
                  Request a Quote
                </Link>
              </div>
            </motion.div>
            </div>
          )}
        </AnimatePresence>
    </header>
  );
}
