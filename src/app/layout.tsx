import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "757 Safe Eats: Chesapeake | Gluten-Free Dining Guide",
  description:
       "The definitive guide to safe, delicious gluten-free dining in Chesapeake, Virginia and the 757 area code. Personal reviews and ratings for gluten-sensitive diners.",
  keywords: "gluten free, celiac safe, Chesapeake VA, 757 Safe Eats, GF restaurants, Virginia Beach GF dining, Norfolk GF dining",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
     >
       <body className="min-h-full flex flex-col">
         <nav className="bg-white border-b sticky top-0 z-50">
           <div className="max-w-6xl mx-auto px-4">
             <div className="flex justify-between items-center h-16">
                <Link href="/" className="text-xl font-bold text-emerald-600">
                757 Safe Eats
                </Link>
                <div className="flex items-center space-x-6">
                  <Link
                  href="/"
                  className="text-gray-600 hover:text-emerald-600 transition-colors"
                  >
                  Restaurants
                  </Link>
                  <Link
                  href="/"
                  className="text-gray-600 hover:text-emerald-600 transition-colors"
                  >
                  Submit Restaurant
                  </Link>
                </div>
              </div>
            </div>
          </nav>
          {children}
        </body>
      </html>
    );
}
