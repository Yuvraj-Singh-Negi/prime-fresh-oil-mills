interface SectionHeadingProps {
  heading: string;
  subheading?: string;
  className?: string;
}

export function SectionHeading({ heading, subheading, className }: SectionHeadingProps) {
  return (
    <div className={["max-w-3xl mx-auto text-center", className].filter(Boolean).join(" ")}>
      <h2 className="heading-2 text-3xl md:text-4xl text-foreground mb-3">
        {heading}
      </h2>
      {subheading && (
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {subheading}
        </p>
      )}
    </div>
  );
}
