import { useQuoteCart } from "@/components/quote/QuoteCartProvider";
import { formatMetricTons } from "@/lib/utils";
import { Truck } from "lucide-react";

export function QuoteSummary() {
  const { itemCount, totalMetricTons } = useQuoteCart();

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Unique products</p>
          <p className="text-lg font-semibold text-foreground">{itemCount}</p>
        </div>
        <div className="flex items-end gap-2">
          <p className="text-sm text-muted-foreground">Total requested</p>
          <p className="text-2xl font-semibold text-foreground">
            {formatMetricTons(totalMetricTons)}
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Truck className="h-4 w-4" aria-hidden="true" />
          <span>Pricing confirmed after review — no amounts are quoted upfront.</span>
        </div>
      </div>
    </div>
  );
}
