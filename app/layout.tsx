import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/components/cart-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MotionSystem } from "@/components/motion-system";

export const metadata: Metadata = {
  title: { default: "2bshine — Skin Atelier Yogyakarta", template: "%s" },
  description: "Website presentasi premium 2bshine: skincare, perawatan, dan pengalaman beauty clinic di Yogyakarta.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="id"><body><CartProvider><Header/><MotionSystem/>{children}<Footer/></CartProvider></body></html>;
}
