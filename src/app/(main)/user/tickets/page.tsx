"use client";

import TicketCard from "@/app/components/TicketCard";
import { use, useState } from "react";

export default function Tickets() {
  const [navItem, setNavItem] = useState(0);
  const [status, setStatus] = useState(0);

  const navItems = [
    { key: 0, label: "Upcoming" },
    { key: 1, label: "Past" },
    { key: 2, label: "Canceled" },
  ];

  const ticketList: {
    ticketId: number;
    event: {
      eventId: number;
      eventName: string;
      flyer: { src: string; alt: string };
      location: { city: string; address: string };
      startTime: Date;
    };
    qrcode: string;
    status: number;
    attendees: number;
  }[] = [
    {
      ticketId: 12475,
      event: {
        flyer: { src: "/indie_poster.jpg", alt: "Event flyer" },
        eventId: 1,
        eventName: "Jazz & Wine Night",
        location: { city: "Culiacán", address: "Av. Francisco I. Madero 8763" },
        startTime: new Date("December 17, 1995 17:00:00"),
      },
      qrcode: "qrcode",
      status: 0,
      attendees: 3,
    },
    {
      ticketId: 22457,
      event: {
        flyer: { src: "/indie_poster.jpg", alt: "Event flyer" },
        eventId: 1,
        eventName: "Jazz & Wine Night",
        location: { city: "Culiacán", address: "Av. Francisco I. Madero 8763" },
        startTime: new Date("December 17, 1995 17:00:00"),
      },
      qrcode: "qrcode",
      status: 0,
      attendees: 3,
    },
    {
      ticketId: 32457,
      event: {
        flyer: { src: "/indie_poster.jpg", alt: "Event flyer" },
        eventId: 1,
        eventName: "Jazz & Wine Night",
        location: { city: "Culiacán", address: "Av. Francisco I. Madero 8763" },
        startTime: new Date("December 17, 1995 17:00:00"),
      },
      qrcode: "qrcode",
      status: 0,
      attendees: 3,
    },
    {
      ticketId: 42457,
      event: {
        flyer: { src: "/indie_poster.jpg", alt: "Event flyer" },
        eventId: 1,
        eventName: "Jazz & Wine Night",
        location: { city: "Culiacán", address: "Av. Francisco I. Madero 8763" },
        startTime: new Date("December 17, 1995 17:00:00"),
      },
      qrcode: "qrcode",
      status: 0,
      attendees: 3,
    },
    {
      ticketId: 52457,
      event: {
        flyer: { src: "/indie_poster.jpg", alt: "Event flyer" },
        eventId: 1,
        eventName: "Jazz & Wine Night",
        location: { city: "Culiacán", address: "Av. Francisco I. Madero 8763" },
        startTime: new Date("December 17, 1995 17:00:00"),
      },
      qrcode: "qrcode",
      status: 1,
      attendees: 3,
    },
    {
      ticketId: 62457,
      event: {
        flyer: { src: "/indie_poster.jpg", alt: "Event flyer" },
        eventId: 1,
        eventName: "Jazz & Wine Night",
        location: { city: "Culiacán", address: "Av. Francisco I. Madero 8763" },
        startTime: new Date("December 17, 1995 17:00:00"),
      },
      qrcode: "qrcode",
      status: 1,
      attendees: 3,
    },
    {
      ticketId: 72577,
      event: {
        flyer: { src: "/indie_poster.jpg", alt: "Event flyer" },
        eventId: 1,
        eventName: "Jazz & Wine Night",
        location: { city: "Culiacán", address: "Av. Francisco I. Madero 8763" },
        startTime: new Date("December 17, 1995 17:00:00"),
      },
      qrcode: "qrcode",
      status: 1,
      attendees: 3,
    },
    {
      ticketId: 82457,
      event: {
        flyer: { src: "/indie_poster.jpg", alt: "Event flyer" },
        eventId: 1,
        eventName: "Jazz & Wine Night",
        location: { city: "Culiacán", address: "Av. Francisco I. Madero 8763" },
        startTime: new Date("December 17, 1995 17:00:00"),
      },
      qrcode: "qrcode",
      status: 2,
      attendees: 3,
    },
  ];

  const handleClick = (key:number) => {
    setNavItem(key);
  };

  return (
    <div className="flex min-h-145 max-h-210 overflow-hidden pt-5">
      <nav className="mr-10 p-5 w-1/4 flex align-top pt-10">
        <ul className="text-2xl text-end w-full">
          {navItems.map(item => (
            <li key={item.key} className="mb-0.5">
              <button type="button" onClick={() => handleClick(item.key)} className={`${item.key === navItem ? 'underline underline-offset-2 text-blue' : ''}`}>{item.label}</button>
            </li>
          ))}
        </ul>
      </nav>

      <section className="flex flex-col gap-6 p-5 overflow-y-scroll">
        {ticketList
          .filter(ticket => ticket.status === navItem)
          .map((ticket) => (
          <TicketCard
            key={ticket.ticketId}
            ticket={ticket}
          ></TicketCard>
        ))}
      </section>
    </div>
  );
}
