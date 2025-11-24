import type { Metadata } from "next";
import "../globals.css";
import Header from "../components/header/Header";
import Footer from "../components/Footer";
import { AuthProvider } from "../context/AuthContext";

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
      <body className="antialiased font-sans">
        <AuthProvider>
          <Header />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
