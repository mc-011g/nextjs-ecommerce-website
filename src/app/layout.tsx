import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ReduxProvider from "@/components/ReduxProvider";
import { Footer } from "@/components/Footer";
import { Jost } from "next/font/google";
import { ProtectedRoute } from "@/components/ProtectedRoute";

const jost = Jost({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "Ecommerce Website",
  description: "Ecommerce website that sells shoes, athetic shoes, and boots.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jost.className}>
      <body>
        <ReduxProvider>

          <ProtectedRoute>
            <Navbar />
            {children}
            <Footer />
          </ProtectedRoute>

        </ReduxProvider>
      </body>
    </html>
  );
}
