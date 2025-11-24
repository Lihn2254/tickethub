import Image from "next/image";
import Link from "next/link";
import NavBar from "./NavBar";
import UserIcon from "./UserIcon";

export default function Header() {
  return (
    <header className="w-full bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between relative p-4">
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="/logos/evantLogo.png"
              alt="Main Logo"
              width={60}
              height={40}
              priority
            />
          </Link>
          <Link href="/">
            <span className="title">
              TicketHub
            </span>
          </Link>
        </div>
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2">
          <NavBar />
        </div>
        <UserIcon />
      </div>
    </header>
  );
}
