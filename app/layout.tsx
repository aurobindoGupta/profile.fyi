import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import ToastProvider from "@/components/appAlerts/ToastProviderComponent";
import { ReduxProvider } from "@/redux/ReduxProvider";
import { CartProvider } from "./CartProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Profile.fyi",
  description: "Created by Aurobindo Gupta",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <ToastProvider>
            <CartProvider>
              <Header />
              {children}
            </CartProvider>
          </ToastProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
