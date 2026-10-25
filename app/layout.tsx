import type { Metadata } from "next";
import "./globals.css";
import { QuoteCartProvider } from "@/components/quote/QuoteCartProvider";
import { ToastProvider } from "@/components/quote/ToastBridge";
import { SiteHeader } from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import { Toast } from "@/components/quote/Toast";

export const metadata: Metadata = {
  title: {
    template: "%s | Prime Fresh Oil Mills",
    default: "Prime Fresh Oil Mills | Premium Edible Seeds & Oils",
  },
  description:
    "Explore bulk edible seeds, oils, and de-oiled cakes from Prime Fresh Oil Mills. Prepare a quotation request for your business procurement needs.",
  metadataBase: new URL("https://primefreshoilmills.example"),
  openGraph: {
    siteName: "Prime Fresh Oil Mills",
    title: "Prime Fresh Oil Mills | Premium Edible Seeds & Oils",
    description:
      "Bulk supplier of edible seeds, oils, and de-oiled seed cakes for wholesalers, distributors, processors, and industrial buyers.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <QuoteCartProvider>
          <ToastProvider>
            <Toast />
            <SiteHeader />
            <main>{children}</main>
            <SiteFooter />
          </ToastProvider>
        </QuoteCartProvider>
      </body>
    </html>
  );
}
