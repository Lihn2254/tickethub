"use client";

import Image from "next/image";
import Link from "next/link";
import { RefObject, useEffect, useRef, useState } from "react";
import { useOutsideClick } from "@/app/hooks/useOutsideClick";
import { useAuth } from "@/app/context/AuthContext";
import { User } from "@/app/types/userTypes";

function MenuLink({
  text,
  buttonClicked,
  href,
  src,
  alt,
}: {
  text: string;
  buttonClicked: () => void;
  href: string;
  src: string;
  alt: string;
}) {
  return (
    <>
      <Link onClick={buttonClicked} href={href} className="flex flex-row">
        <Image src={src} alt={alt} width={20} height={20} className="mr-2" />
        {text}
      </Link>
    </>
  );
}

function ProfileOptions({
  user,
  buttonClicked
}: {
  user: User | null,
  buttonClicked: () => void
}) {
  const { logoutUser } = useAuth();

  const handleLogout = () => {
    logoutUser();
    buttonClicked();
  };

  return (
    <ul  className="mt-2 flex flex-col min-w-35 gap-1.5 absolute bg-white border-2 rounded-md p-4 border-light-blue whitespace-nowrap right-0">
      <li>
        <p className="font-bold">{user?.name}</p>
        <p className="text-sm font-semibold">{user?.username}</p>
      </li>
      <hr className="mt-1 mb-1"/>
      <li>
        <MenuLink
          text="Profile"
          buttonClicked={buttonClicked}
          href="/user"
          src="/icons/user.svg"
          alt="Profile"
        />
      </li>
      <li>
        <MenuLink
          text="My tickets"
          buttonClicked={buttonClicked}
          href="/user/tickets"
          src="/icons/ticket.svg"
          alt="Ticket"
        />{" "}
      </li>
      <li>
        <MenuLink
          text="Settings"
          buttonClicked={buttonClicked}
          href="/settings"
          src="/icons/settings.svg"
          alt="Settings"
        />
      </li>
      <hr className="mt-1 mb-1" />
      <li>
        <MenuLink
          text="Logout"
          buttonClicked={handleLogout}
          href="/login"
          src="/icons/logout.svg"
          alt="Logout"
        />
      </li>
    </ul>
  );
}

export default function UserIcon() {
  const [dropMenu, setDropMenu] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  const buttonClicked = () => {
    setDropMenu(!dropMenu);
  };

  useOutsideClick(containerRef, () => {
    if (dropMenu) {
      setDropMenu(false);
    }
  });

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={buttonClicked}
        className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
      >
        <Image
          src="/icons/user.png"
          alt="User icon"
          width={25}
          height={25}
          priority
        />
      </button>
      {dropMenu && <ProfileOptions user={user} buttonClicked={buttonClicked} />}
    </div>
  );
}
