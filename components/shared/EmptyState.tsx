import { ArrowRight, PackageX } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  body?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export function EmptyState({
  title = "Your quote cart is empty",
  body = "Add products to prepare a bulk quotation request.",
  ctaLabel = "Explore Products",
  ctaHref = "/",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 md:py-32">
      <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-surface border border-border mb-6">
        <PackageX className="h-10 w-10 text-muted-foreground" aria-hidden="true" />
      </div>
      <h2 className="heading-2 text-2xl md:text-3xl text-foreground mb-3">{title}</h2>
      <p className="text-lg text-muted-foreground max-w-md mb-8">{body}</p>
      <a
        href={ctaHref}
        className="inline-flex items-center gap-2 font-medium text-gold hover:text-gold-hover transition-colors"
      >
        {ctaLabel}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </a>
    </div>
  );
}
