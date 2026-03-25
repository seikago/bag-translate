import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bag Translate - 包袋行业日语口语练习",
  description: "专为包袋行业外贸人设计的日语口语练习工具",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body>{children}</body>
    </html>
  );
}
