import type { Metadata } from "next";
import "../globals.css";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/header/Header";
import { AuthProvider } from "@/app/context/AuthContext";

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
      <body className="antialiased font-sans">
        <AuthProvider>
          <Header/>
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}