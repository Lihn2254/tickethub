"use client";

import { useState } from "react";
import AccountInfo from "./AccountInfo";

export default function Settings() {
  const [navItem, setNavItem] = useState(0);
  const navItems = [
    { key: 0, label: "Account information" },
    { key: 1, label: "Log in and security" },
    { key: 2, label: "Privacy" },
    { key: 3, label: "Notifications" },
    { key: 4, label: "Billing information" },
    { key: 5, label: "Language and location" },
  ];

  const renderSelectedCategory = () => {
    switch (navItem) {
      case 0: {
        return <AccountInfo />;
      }
      default: {
        return null;
      }
    }
  };

  return (
    <div className="flex flex-row py-10">
      <section className="w-1/4 pl-20">
        <span className="font-semibold text-3xl pl-5">Settings</span>
        <nav className="flex align-top pt-8">
          <ul className="text-xl w-full">
            {navItems.map((item) => (
              <li
                key={item.key}
                onClick={() => setNavItem(item.key)}
                className="hover:bg-gray-200 rounded-2xl options-list funnel-text font-light"
              >
                <button
                  type="button"
                  onClick={() => setNavItem(item.key)}
                  className={`${
                    item.key === navItem
                      ? "underline underline-offset-2 text-blue"
                      : ""
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </section>
      <section className="px-5">
        {renderSelectedCategory()}
      </section>
      
    </div>
  );
}
