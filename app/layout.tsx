import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const outfit = Outfit({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "POS Camping",
  description: "POS Camping",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body
          className={`${outfit.className}`}
        >
          {children}
        </body>
      </Providers>
    </html>
  );
}
