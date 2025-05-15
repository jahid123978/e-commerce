// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import SessionProvider from "@/utils/SessionProvider";
import Providers from "@/Providers";       
import ReduxProvider from "./ReduxProvider";  
import { Footer, Header } from "@/components";
import { getServerSession } from "next-auth";
import 'svgmap/dist/svgMap.min.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ShopNest",
  description: "Developed by Jahid Hasan",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html lang="en" data-theme="light">
      <body className={inter.className}>
        {/* 1. ReduxProvider must wrap everything that needs access to the store */}
        <ReduxProvider>
          {/* 2. Your existing session and other providers */}
          <SessionProvider session={session}>
            <Header />
            <Providers>
              {children}
            </Providers>
            <Footer />
          </SessionProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
