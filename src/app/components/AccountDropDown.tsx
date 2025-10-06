"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function AccountDropDown() {
  const [dropMenu, setDropMenu] = useState(false);

  const buttonClicked = () => {
    dropMenu === false ? setDropMenu(true) : setDropMenu(false);
  };

  if (!dropMenu) {
    return (
      <div className="relative">
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
      </div>
    );
  } else {
    return (
      <div className="relative">
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
        <nav>
          <ul>
            <li>
              <Link onClick={buttonClicked} href="/user">
                My Account
              </Link>
            </li>
            <li>
              <Link onClick={buttonClicked} href="/settings">
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}
