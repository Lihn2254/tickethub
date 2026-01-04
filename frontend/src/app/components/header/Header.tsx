'use client'

import Image from "next/image";
import Link from "next/link";
import NavBar from "./NavBar";
import UserIcon from "./UserIcon";
import { useAuth } from "@/app/context/AuthContext";

export default function Header() {
  const { user } = useAuth();

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
        {user != null ? <UserIcon /> : (
          <div className="flex gap-4">
            <Link href='/login' className="px-6 py-2 bg-white border border-gray-200 rounded-full hover:shadow-md transition-all duration-300 hover:border-blue-300">Sign In</Link>
            <Link href='/signup' className="px-6 py-2 bg-dark-blue text-white border border-dark-blue rounded-full hover:shadow-md transition-all duration-300 hover:border-darker-blue">Sign Up</Link>
          </div>
        )}
      </div>
    </header>
  );
}
