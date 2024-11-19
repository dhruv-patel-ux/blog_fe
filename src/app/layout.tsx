import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Blog Application",
  description: "A simple blog application using JSONPlaceholder API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        <nav className="bg-white shadow-md sticky top-0 z-10 animate-slide-in">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between h-16">
              <div className="flex space-x-8">
                <Link 
                  href="/" 
                  className="flex items-center text-gray-700 hover:text-blue-600 transition-colors duration-200"
                >
                  Home
                </Link>
                <Link 
                  href="/favorites" 
                  className="flex items-center text-gray-700 hover:text-blue-600 transition-colors duration-200"
                >
                  Favorites
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <main className="py-8">{children}</main>
      </body>
    </html>
  );
}