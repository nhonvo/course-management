import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Financial Dashboard",
  description: "My Personal Financial Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`flex h-screen ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex flex-col flex-1 overflow-hidden">
          <Navbar />
          <main className="p-6 overflow-y-auto">
            <div className="min-h-screen max-w-screen flex flex-col md:flex-row">
              <Sidebar />
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
