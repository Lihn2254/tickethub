import { AuthProvider } from "@/app/context/AuthContext";
import { Red_Hat_Display, Funnel_Display } from "next/font/google";
import "@/app/globals.css";
import { Metadata } from "next";
import Footer from "@/app/components/Footer";

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
  title: "Sign In",
  description: "Log in to TicketHub",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${redHat.variable} ${funnel.variable} antialiased`}>
        <AuthProvider>
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
