"use client";

import Image from "next/image";
import Link from "next/link";
import { RefObject, useRef, useState } from "react";
import { useOutsideClick } from "@/app/hooks/useOutsideClick";

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
  buttonClicked
}: {
  buttonClicked: () => void
}) {
  return (
    <ul  className="mt-2 flex flex-col w-min-fit gap-1.5 absolute bg-white border-2 rounded-md p-4 border-light-blue whitespace-nowrap -translate-x-30">
      <li>
        <p className="font-bold">Erick Hermosillo</p>
      </li>
      <hr className="mt-1 mb-1" />
      <li>
        <MenuLink
          text="Profile"
          buttonClicked={buttonClicked}
          href="/user"
          src="/user.svg"
          alt="Profile"
        />
      </li>
      <li>
        <MenuLink
          text="My tickets"
          buttonClicked={buttonClicked}
          href="/user"
          src="/ticket.svg"
          alt="Ticket"
        />{" "}
      </li>
      <li>
        <MenuLink
          text="Settings"
          buttonClicked={buttonClicked}
          href="/settings"
          src="/settings.svg"
          alt="Settings"
        />
      </li>
      <hr className="mt-1 mb-1" />
      <li>
        <MenuLink
          text="Logout"
          buttonClicked={buttonClicked}
          href="/user"
          src="/logout.svg"
          alt="Logout"
        />
      </li>
    </ul>
  );
}

export default function UserIcon() {
  const [dropMenu, setDropMenu] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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
          src="/user.png"
          alt="User icon"
          width={25}
          height={25}
          priority
        />
      </button>
      {dropMenu && <ProfileOptions buttonClicked={buttonClicked} />}
    </div>
  );
}
