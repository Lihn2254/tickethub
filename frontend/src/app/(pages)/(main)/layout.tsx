import type { Metadata } from "next";
import { Red_Hat_Display, Funnel_Display } from "next/font/google";
import "@/app/globals.css";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/header/Header";
import { AuthProvider } from "@/app/context/AuthContext";

const redHat = Red_Hat_Display({
  subsets: ["latin"],
  variable: "--font-red-hat",
  display: "swap",
});

const funnel = Funnel_Display({
  subsets: ["latin"],
  variable: "--font-funnel",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TicketHub",
  description: "Ticket sales for events.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${redHat.variable} ${funnel.variable} antialiased`}>
        <AuthProvider>
          <Header />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
