"use client";

import EventCard from "../components/EventCard";
import { useEffect, useState } from "react";
import getEvents, { getFlyerImages } from "../services/events";
import { Xevent } from "../types/eventTypes";
import { mapApiEventsToXevents } from "../utils/utils";

export default function Home() {
  const [events, setEvents] = useState<Xevent[]>([]);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const events = await getEvents(null, null, null, null);

        if (events.length > 0) {
          let flyerPaths: string[] = [];
          events.forEach((event) => flyerPaths.push(event.flyerPath));

          const eventFlyers = await getFlyerImages(flyerPaths);

          const mappedEvents = mapApiEventsToXevents(events, eventFlyers);
          setEvents(mappedEvents);
        }
      } catch (error) {
        console.error("Failed to fecth events: ", error);
      }
    };

    loadEvents();
  }, []);

  return (
    <div className="justify-items-center min-h-screen p-8 pb-20">
      <h1 className="mb-2 text-5xl funnel-text font-medium">Upcoming events</h1>
      <p className="pb-8 pt-7 text-red-600 sticky top-0 text-center w-fit">
        Aquí poner opciones de filtrado.
      </p>
      <main className="flex flex-col lg:flex-row w-full flex-wrap gap-6 justify-center items-center lg:items-start">
        {events.map((event) => (
          <EventCard key={event.id} {...event} />
        ))}
      </main>
    </div>
  );
}
