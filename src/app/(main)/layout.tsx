import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Header from "../components/header/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Ticket App",
  description: "Ticket sales for events.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased font-sans"
      >
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
