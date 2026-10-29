import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./CartContext";
import { WishlistProvider } from "./WishlistContext";
import { CurrencyProvider } from "./CurrencyContext";
import CartDrawer from "@/components/CartDrawer";
import LiveSalesNotification from "@/components/LiveSalesNotification";
import WhatsAppConcierge from "@/components/WhatsAppConcierge";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NO LONG NO OUTFIT | Premium Streetwear",
  description: "Oversize kesimler, ağır gramajlı kumaşlar ve sokağın sessiz gücü. Yeni sezon koleksiyonu.",
  keywords: ["streetwear", "oversize tişört", "hoodie", "sweatshirt", "no long no outfit"],
  openGraph: {
    title: "NO LONG NO OUTFIT",
    description: "Premium Streetwear. Sade, oversize ve sınırlı sayıda.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CurrencyProvider>
          <CartProvider>
            <WishlistProvider>
              {children}
              <CartDrawer />
              <LiveSalesNotification />
              <WhatsAppConcierge />
            </WishlistProvider>
          </CartProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}
