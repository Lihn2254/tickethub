import { AuthProvider } from "@/app/context/AuthContext";
import Footer from "../components/Footer";
import "../globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log in",
  description: "Log in to Evant",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        <AuthProvider>
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
