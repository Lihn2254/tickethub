"use client";

import TicketCard from "@/app/components/TicketCard";
import { Ticket } from "@/app/types/ticketTypes";
import Image from "next/image";
import { use, useState } from "react";

export default function Tickets() {
  const [navItem, setNavItem] = useState(0);
  const [status, setStatus] = useState(0);

  const navItems = [
    {
      key: 0,
      label: "Upcoming",
      img: { src: "/icons/upcoming.svg", alt: "Upcoming" },
    },
    {
      key: 1,
      label: "Past",
      img: { src: "/icons/upcoming.svg", alt: "Upcoming" },
    },
    {
      key: 2,
      label: "Canceled",
      img: { src: "/icons/upcoming.svg", alt: "Upcoming" },
    },
  ];

  const ticketList: Ticket[] = [
    {
      id: 12475,
      event: {
        flyer: { src: "/stock/indie_poster.jpg", alt: "Event flyer" },
        id: 1,
        name: "Jazz & Wine Night",
        location: { city: "Culiacán", address: "Av. Francisco I. Madero 8763" },
        startTime: new Date("December 17, 1995 17:00:00"),
      },
      qrcode: "qrcode",
      status: 0,
      attendees: 3,
    },
    {
      id: 22457,
      event: {
        flyer: { src: "/stock/indie_poster.jpg", alt: "Event flyer" },
        id: 1,
        name: "Jazz & Wine Night",
        location: { city: "Culiacán", address: "Av. Francisco I. Madero 8763" },
        startTime: new Date("December 17, 1995 17:00:00"),
      },
      qrcode: "qrcode",
      status: 0,
      attendees: 3,
    },
    {
      id: 32457,
      event: {
        flyer: { src: "/stock/indie_poster.jpg", alt: "Event flyer" },
        id: 1,
        name: "Jazz & Wine Night",
        location: { city: "Culiacán", address: "Av. Francisco I. Madero 8763" },
        startTime: new Date("December 17, 1995 17:00:00"),
      },
      qrcode: "qrcode",
      status: 0,
      attendees: 3,
    },
    {
      id: 42457,
      event: {
        flyer: { src: "/stock/indie_poster.jpg", alt: "Event flyer" },
        id: 1,
        name: "Jazz & Wine Night",
        location: { city: "Culiacán", address: "Av. Francisco I. Madero 8763" },
        startTime: new Date("December 17, 1995 17:00:00"),
      },
      qrcode: "qrcode",
      status: 0,
      attendees: 3,
    },
    {
      id: 52457,
      event: {
        flyer: { src: "/stock/indie_poster.jpg", alt: "Event flyer" },
        id: 1,
        name: "Jazz & Wine Night",
        location: { city: "Culiacán", address: "Av. Francisco I. Madero 8763" },
        startTime: new Date("December 17, 1995 17:00:00"),
      },
      qrcode: "qrcode",
      status: 1,
      attendees: 3,
    },
    {
      id: 62457,
      event: {
        flyer: { src: "/stock/indie_poster.jpg", alt: "Event flyer" },
        id: 1,
        name: "Jazz & Wine Night",
        location: { city: "Culiacán", address: "Av. Francisco I. Madero 8763" },
        startTime: new Date("December 17, 1995 17:00:00"),
      },
      qrcode: "qrcode",
      status: 1,
      attendees: 3,
    },
    {
      id: 72577,
      event: {
        flyer: { src: "/stock/indie_poster.jpg", alt: "Event flyer" },
        id: 1,
        name: "Jazz & Wine Night",
        location: { city: "Culiacán", address: "Av. Francisco I. Madero 8763" },
        startTime: new Date("December 17, 1995 17:00:00"),
      },
      qrcode: "qrcode",
      status: 1,
      attendees: 3,
    },
    {
      id: 82457,
      event: {
        flyer: { src: "/stock/indie_poster.jpg", alt: "Event flyer" },
        id: 1,
        name: "Jazz & Wine Night",
        location: { city: "Culiacán", address: "Av. Francisco I. Madero 8763" },
        startTime: new Date("December 17, 1995 17:00:00"),
      },
      qrcode: "qrcode",
      status: 2,
      attendees: 3,
    },
  ];

  const handleClick = (key: number) => {
    setNavItem(key);
  };

  return (
    <div className="flex min-h-145 max-h-210 overflow-hidden pt-5">
      <nav className="mr-10 p-5 w-1/3 flex align-top pt-10">
        <ul className="text-2xl text-end w-full">
          {navItems.map((item) => (
            <li
              key={item.key}
              onClick={() => handleClick(item.key)}
              className="hover:bg-gray-200 rounded-2xl options-list funnel-text font-light"
            >
              <button
                type="button"
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

      <section className="flex flex-col gap-6 p-5 overflow-y-scroll">
        {ticketList
          .filter((ticket) => ticket.status === navItem)
          .map((ticket) => (
            <TicketCard key={ticket.id} {...ticket}></TicketCard>
          ))}
      </section>
    </div>
  );
}
