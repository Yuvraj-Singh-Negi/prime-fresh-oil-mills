"use client";

import { useState, FormEvent, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useQuoteCart, useQuoteSubmission } from "@/components/quote/QuoteCartProvider";
import { products } from "@/lib/products";
import { validateQuantity, validateProductSelection, isValidQuantity } from "@/lib/validation";
import { formatMetricTons } from "@/lib/utils";
import { PrimaryButton } from "@/components/shared/PrimaryButton";

interface BulkQuoteFormProps {}

export function BulkQuoteForm() {
  const { addItem } = useQuoteCart();
  const { submitCart } = useQuoteSubmission();
  const reducedMotion = useReducedMotion() ?? false;

  const [productId, setProductId] = useState("yellow-mustard-seeds");
  const [quantity, setQuantity] = useState("");
  const [quantityErrors, setQuantityErrors] = useState<string[]>([]);
  const [productErrors, setProductErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<{ productName: string; quantity: number } | null>(
    null
  );

  const productOptions = products.map((p) => ({ value: p.id, label: p.name }));

  const validateForm = useCallback(() => {
    const productValidation = validateProductSelection(productId);
    const quantityValidation = validateQuantity(quantity);

    setProductErrors(productValidation.errors.map((e) => e.message));
    setQuantityErrors(quantityValidation.errors.map((e) => e.message));

    return productValidation.valid && quantityValidation.valid;
  }, [productId, quantity]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
      const { name, value } = e.target;
      if (name === "product") {
        setProductId(value);
        setProductErrors([]);
      } else if (name === "quantity") {
        setQuantity(value);
        if (isValidQuantity(Number(value)) || value === "") {
          setQuantityErrors([]);
        }
      }
    },
    []
  );

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (isSubmitting) return;

      const valid = validateForm();
      if (!valid) return;

      const parsed = Number(quantity);
      if (!isValidQuantity(parsed)) {
        setQuantityErrors(["Enter a valid quantity between 0.001 and 100,000 metric tons."]);
        return;
      }

      const product = products.find((p) => p.id === productId);
      setIsSubmitting(true);

      const timer = setTimeout(() => {
        addItem(productId, parsed);
        setIsSubmitting(false);
        setConfirmation({ productName: product?.name ?? productId, quantity: parsed });
        setQuantity("");
        setQuantityErrors([]);
        setProductErrors([]);
      }, reducedMotion ? 0 : 600);

      return () => clearTimeout(timer);
    },
    [productId, quantity, isSubmitting, addItem, reducedMotion]
  );

  const dismissConfirmation = useCallback(() => setConfirmation(null), []);

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[#F5F0E6]/60 -z-10" aria-hidden="true" />
      <div className="max-w-5xl mx-auto px-6 py-12 md:py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12">
          {/* Left: form content */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="heading-2 text-3xl md:text-4xl text-foreground">Build a Bulk Quote</h2>
              <p className="text-muted-foreground">
                Select a product and quantity to start your RFQ.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="space-y-2">
                <label htmlFor="bulk-product" className="block text-sm font-medium text-foreground">
                  Select Product
                </label>
                <select
                  id="bulk-product"
                  name="product"
                  value={productId}
                  onChange={handleChange}
                  className="block w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold transition-colors disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  <option value="" disabled className="text-muted-foreground">
                    Choose a product
                  </option>
                  {productOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                {productErrors.length > 0 && (
                  <p className="text-sm text-destructive flex items-center gap-1.5">
                    {productErrors[0]}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="bulk-quantity" className="block text-sm font-medium text-foreground">
                  Enter Quantity (Metric Tons / KG)
                </label>
                <div className="relative">
                  <input
                    id="bulk-quantity"
                    name="quantity"
                    type="text"
                    value={quantity}
                    onChange={handleChange}
                    inputMode="decimal"
                    step="0.001"
                    min="0.001"
                    max="100000"
                    placeholder="Enter Quantity"
                    className="block w-full rounded-xl border border-border bg-surface pl-10 pr-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-gold transition-colors disabled:opacity-50"
                    disabled={isSubmitting}
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                    MT
                  </div>
                </div>
                {quantityErrors.length > 0 && (
                  <p className="text-sm text-destructive flex items-center gap-1.5">
                    {quantityErrors[0]}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="bulk-destination" className="block text-sm font-medium text-foreground">
                  Delivery Destination
                </label>
                <input
                  id="bulk-destination"
                  type="text"
                  value="Factory Address - Placeholder"
                  readOnly
                  className="block w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-muted-foreground focus:outline-none transition-colors"
                />
              </div>

              <PrimaryButton
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="h-4 w-4 animate-spin mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Calculating…
                  </>
                ) : (
                  <>
                    Calculate Estimated Price & Add to Quote
                    <ArrowRight className="h-4 w-4 ml-1" aria-hidden="true" />
                  </>
                )}
              </PrimaryButton>
            </form>

            <p className="text-sm text-muted-foreground">
              No prices are calculated here — this prepares a quotation request
              for review before submission.
            </p>
          </div>

          {/* Right: confirmation panel */}
          <div className="hidden lg:block">
            <div className="rounded-2xl border border-gold/20 bg-gold/5 p-8 shadow-xl">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-gold/10 flex items-center justify-center text-gold">
                  <ArrowRight className="h-6 w-6" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Quote request prepared</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your selection is held in the bulk quote cart while you
                    continue browsing.
                  </p>
                </div>
              </div>
              <AnimatePresence mode="wait">
                {confirmation && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="rounded-xl border border-success/20 bg-success/5 p-4 mb-6"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-success text-success-foreground flex items-center justify-center">
                        <span className="text-[10px] font-bold">✓</span>
                      </div>
                      <div>
                        <p className="text-sm text-success font-medium">
                          {confirmation.productName} added to your quote.
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatMetricTons(confirmation.quantity)} queued.
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={dismissConfirmation}
                      className="mt-3 text-xs text-gold underline underline-offset-4 hover:text-gold-hover"
                    >
                      Dismiss
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="pt-4 border-t border-border/50">
                <p className="text-xs text-muted-foreground mb-3">
                  Next step: review and adjust quantities in your quote cart.
                </p>
                <a
                  href="/quote-cart"
                  className="inline-flex items-center gap-2 font-medium text-gold hover:text-gold-hover transition-colors"
                >
                  View Quote Cart
                  <ChevronDown className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          {/* Mobile confirmation banner */}
          {confirmation && (
            <AnimatePresence mode="wait">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="lg:hidden rounded-xl border border-success/20 bg-success/5 p-4 mb-6"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-success text-success-foreground flex items-center justify-center mt-0.5">
                    <span className="text-[10px] font-bold">✓</span>
                  </div>
                  <div>
                    <p className="text-sm text-success font-medium">
                      {confirmation.productName} added to your quote.
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatMetricTons(confirmation.quantity)} queued.
                    </p>
                  </div>
                </div>
                <button
                  onClick={dismissConfirmation}
                  className="mt-3 text-xs text-gold underline underline-offset-4 hover:text-gold-hover"
                >
                  Dismiss
                </button>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </section>
  );
}
