import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ABA Roller Skating Analysis",
  description: "Analyze roller skating activities with ABA methodology and Portuguese transcription",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
