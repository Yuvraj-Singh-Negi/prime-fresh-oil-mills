"use client";

import { useState } from "react";
import { useQuoteCart, useQuoteSubmission } from "@/components/quote/QuoteCartProvider";
import { QuoteCartItem } from "@/components/quote/QuoteCartItem";
import { QuoteSummary } from "@/components/quote/QuoteSummary";
import { EmptyState } from "@/components/shared/EmptyState";
import { PrimaryButton } from "@/components/shared/PrimaryButton";
import Link from "next/link";
import { ArrowRight, RefreshCw, CheckCircle2 } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { formatMetricTons } from "@/lib/utils";

export function QuoteCartPage() {
  const { items, clearCart, itemCount, totalMetricTons } = useQuoteCart();
  const { submitCart, clearSubmitted, submittedSnapshot } = useQuoteSubmission();
  const reducedMotion = useReducedMotion() ?? false;

  const [submitting, setSubmitting] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleSubmit = async () => {
    if (submitting) return;
    setSubmitting(true);
    try {
      // Simulate an asynchronous mock submission.
      await new Promise((resolve) => setTimeout(resolve, reducedMotion ? 0 : 1000));
      const snapshot = submitCart();
      if (!snapshot) return;
    } finally {
      setSubmitting(false);
    }
  };

  const handleClear = () => {
    setConfirmOpen(true);
  };

  const handleConfirmClear = () => {
    clearCart();
    setConfirmOpen(false);
  };

  const handleCancelClear = () => {
    setConfirmOpen(false);
  };

  return (
    <div className="section min-h-[calc(100vh-240px)]">
      <div className="container">
        {/* Submitted success state */}
        {submittedSnapshot && (
          <div className="reveal fade-up" data-reveal-scroll="0">
            <div className="rounded-2xl border border-success/20 bg-success/5 p-8 md:p-12 text-center max-w-md mx-auto mb-8">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-success text-success-foreground mb-6 mx-auto">
                <CheckCircle2 className="h-9 w-9" aria-hidden="true" />
              </div>
              <h2 className="heading-2 text-2xl md:text-3xl text-foreground mb-3">
                Demo RFQ prepared successfully
              </h2>
              <p className="text-muted-foreground mb-6">
                Your mock request for quotation has been prepared. No data was
                transmitted to a server.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3 mb-6">
                <span className="inline-flex items-center gap-2 rounded-lg border border-success/30 bg-success/10 px-3 py-2 text-xs font-medium text-success">
                  Reference ID: <span className="text-gold font-mono">{submittedSnapshot.referenceId}</span>
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-8">
                {submittedSnapshot.items.length} product(s),{' '}
                {formatMetricTons(submittedSnapshot.totalMetricTons)} total.
              </p>
              <button
                onClick={() => {
                  clearSubmitted();
                }}
                className="inline-flex items-center gap-2 rounded-xl border border-gold/40 bg-gold/5 px-6 py-2.5 text-sm font-medium text-gold hover:bg-gold hover:text-gold-foreground transition-colors"
              >
                <RefreshCw className="h-4 w-4" aria-hidden="true" />
                Start a new quote
              </button>
            </div>
          </div>
        )}

        {/* Page heading */}
        {!submittedSnapshot && (
          <>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
              <div>
                <h1 className="heading-2 text-3xl md:text-4xl text-foreground">Your Bulk Quote</h1>
                <p className="text-muted-foreground mt-2">
                  Review your selected products and quantities before preparing
                  your request for quotation.
                </p>
              </div>
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-gold hover:text-gold-foreground transition-colors"
              >
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
                Back to Home
              </Link>
            </div>

            {items.length === 0 ? (
              <EmptyState ctaLabel="Explore Products" ctaHref="/" />
            ) : (
              <>
                <div className="grid gap-5 mb-10">
                  {items.map((item) => (
                    <QuoteCartItem key={item.productId} item={item} />
                  ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <QuoteSummary />
                  </div>
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={handleSubmit}
                      disabled={submitting}
                      className="rounded-xl bg-gold text-gold-foreground px-8 py-4 font-semibold shadow-lg hover:bg-gold-hover disabled:opacity-60 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                    >
                      {submitting ? (
                        <>
                          <svg
                            className="h-5 w-5 animate-spin"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Preparing…
                        </>
                      ) : (
                        <>
                          Submit RFQ
                          <span className="h-4 w-4" aria-hidden="true">
                            <svg
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              viewBox="0 0 24 24"
                              className="h-4 w-4"
                            >
                              <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                          </span>
                        </>
                      )}
                    </button>
                    <p className="text-xs text-muted-foreground text-center">
                      Frontend demo — no real RFQ is transmitted.
                    </p>
                    <button
                      onClick={handleClear}
                      className="rounded-xl border border-border bg-background px-8 py-4 font-medium text-foreground hover:bg-gold/5 hover:text-gold transition-colors flex items-center justify-center gap-2"
                    >
                      <TrashIcon className="h-4 w-4" aria-hidden="true" />
                      Clear Quote ({itemCount})
                    </button>
                  </div>
                </div>
              </>
            )}
          </>
        )}

        {/* Clear confirmation dialog */}
        {confirmOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center" role="dialog" aria-modal="true" aria-label="Clear quote cart">
            <div className="fixed inset-0 bg-[#173F2B]/40 backdrop-blur-sm" onClick={handleCancelClear} />
            <div className="relative bg-surface rounded-2xl border border-border p-8 shadow-xl max-w-md mx-auto animate-[fade-up_0.4s_ease-out_forwards]">
              <h3 className="text-lg font-semibold text-foreground mb-2">Clear your quote cart?</h3>
              <p className="text-sm text-muted-foreground mb-6">
                This will remove all {itemCount} product(s) totaling{' '}
                {formatMetricTons(totalMetricTons)}. This cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={handleCancelClear}
                  className="rounded-xl border border-border bg-background px-6 py-2.5 font-medium text-foreground hover:bg-gold/5 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmClear}
                  className="rounded-xl bg-destructive text-destructive-foreground px-6 py-2.5 font-medium hover:bg-destructive/90 transition-colors"
                >
                  Yes, clear all
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function TrashIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      className={className}
    >
      <path d="M3 6h18M19 6v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
    </svg>
  );
}
