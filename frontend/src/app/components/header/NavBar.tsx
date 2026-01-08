"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();

  const navItems = [
    { key: "events", label: "Events", href: "/" },
    { key: "user", label: "My Tickets", href: "/user/tickets" },
    { key: "about", label: "About Us", href: "/about" },
  ];

  // Map pathname to nav key
  const getActiveKey = () => {
    if (pathname === "/") return "events";
    if (pathname.startsWith("/user/tickets")) return "user";
    if (pathname.startsWith("/about")) return "about";
    return null;
  };

  const activeKey = getActiveKey();

  return (
    <nav>
      <ul className="flex items-center gap-8 text-lg text-gray-600 font-medium">
        {navItems.map((item) => (
          <li
            key={item.key}
            className={`cursor-pointer hover:text-blue hover:font-bold transition-colors ${
              activeKey === item.key ? "underline underline-offset-8 text-blue font-bold" : ""
            }`}
          >
            <Link href={item.href}>
              <p>{item.label}</p>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
