import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MashCode",
  description: "Ranked 1v1 competitive coding."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
