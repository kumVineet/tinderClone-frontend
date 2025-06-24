"use client";

import { ReactNode } from "react";
import { Providers } from "./providers";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { usePathname } from "next/navigation";
import "./globals.css";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const pathname = usePathname();
  const hideFooterRoutes = ["/login"];
  const showFooter = !hideFooterRoutes.includes(pathname);

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Providers>
          <NavBar />
          <main className="flex-1">{children}</main>
          {showFooter && <Footer className="mt-auto" />}
        </Providers>
      </body>
    </html>
  );
} 