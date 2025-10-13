import Footer from "../../components/Footer";
import "../../globals.css";

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans concert-background">
        {children}
      </body>
    </html>
  );
}
