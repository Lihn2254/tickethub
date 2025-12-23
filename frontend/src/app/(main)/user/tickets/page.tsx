"use client";

import TicketCard from "@/app/components/TicketCard";
import { useAuth } from "@/app/context/AuthContext";
import { getFlyerImages } from "@/app/services/events";
import getTickets from "@/app/services/tickets";
import { ApiTicket, Ticket } from "@/app/types/ticketTypes";
import { mapApiTicketsToTickets, typeGuard } from "@/app/utils/utils";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

export default function Tickets() {
  const [navItem, setNavItem] = useState(0);
  const [allTickets, setAllTickets] = useState<Ticket[]>([]);
  const { user } = useAuth();

  const navItems = [
    { key: 0, label: "Upcoming" },
    { key: 1, label: "Past" },
    { key: 2, label: "Canceled" },
  ];

  useEffect(() => {
    const loadTickets = async () => {
      if (!user || user.accountType !== "client") return;

      const apiTickets = await getTickets(user);

      if (apiTickets.length > 0) {
        const flyerPaths = apiTickets.map((t) => t.event.flyerPath);
        const eventFlyers = await getFlyerImages(flyerPaths);

        const mappedTickets = mapApiTicketsToTickets(apiTickets, eventFlyers);

        setAllTickets(mappedTickets);
      }
    };

    loadTickets();
  }, [user]);

  // 3. Automatically calculate the filtered list whenever 'allTickets' or 'navItem' changes.
  // This replaces 'ticketList' state and the manual filterTickets function.
  const filteredTickets = useMemo(() => {
    if (navItem === 0) {
      return allTickets.filter((ticket) => ticket.status === 1);
    } else if (navItem === 1) {
      return allTickets.filter(
        (ticket) => ticket.status === 0 || ticket.status === 3
      );
    } else if (navItem === 2) {
      return allTickets.filter((ticket) => ticket.status === 2);
    }
    return [];
  }, [allTickets, navItem]);

  return (
    <div className="flex min-h-145 max-h-210 overflow-hidden pt-5">
      <nav className="mr-10 p-5 w-1/3 flex align-top pt-10">
        <ul className="text-2xl text-end w-full">
          {navItems.map((item) => (
            <li
              key={item.key}
              onClick={() => setNavItem(item.key)}
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

      <section className="flex flex-col gap-6 p-5 overflow-y-scroll w-full justify-center">
        {filteredTickets.length > 1 ? (
          filteredTickets.map((ticket) => (
            <TicketCard key={ticket.id} {...ticket}></TicketCard>
          ))
        ) : (
          <div className="flex flex-col items-center self-auto w-full text-3xl text-gray-400">
            <h1 className="pb-3">No tickets were found!</h1>
            <h2>Why don't you take a look at our events?</h2>
            <h1 className="mt-10 text-9xl">;D</h1>
          </div>
        )}
      </section>
    </div>
  );
}
