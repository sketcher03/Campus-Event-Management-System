import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

import "./globals.css";

const poppins = Poppins({ subsets: ["latin"], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], variable: '--font-poppins' });

export const metadata: Metadata = {
  title: "CEMS",
  description: "Campus Event Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{   
        variables: {
          colorNeutral: "#7c2d12",
          colorPrimary: "#ea580c",
          colorText: "#431407",
          colorBackground: "#fffaf5",
          borderRadius: "0.5rem"
        },
        layout: {
          socialButtonsPlacement: 'bottom',
        }
      }}
    >
      <html lang="en">
        <body className={poppins.variable}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
