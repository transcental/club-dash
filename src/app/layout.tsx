import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import React from "react";
import Navbar from "~/components/Navbar";

export const metadata: Metadata = {
  title: "Clubs Dash",
  description: "Dashboard for managing your Hack Club clubs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-slate-600 text-gray-100">
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
