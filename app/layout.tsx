import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ThunderHouse — AI Implementation Agency",
  description:
    "ThunderHouse helps Puerto Rican businesses in PR and Orlando implement AI solutions that eliminate manual work, connect systems, and drive growth.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
