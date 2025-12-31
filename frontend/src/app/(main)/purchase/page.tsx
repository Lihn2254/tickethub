"use client";

import { getEvent, getFlyerImages } from "@/app/services/events";
import { ApiEvent, Xevent } from "@/app/types/eventTypes";
import { mapApiEventsToXevents } from "@/app/utils/utils";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Purchase() {
  const [event, setEvent] = useState<Xevent>();
  const searchParams = useSearchParams();

  useEffect(() => {
    const eventId = searchParams.get("event_id");

    const loadEvent = async () => {
      try {
        const event = await getEvent(eventId);

        if (event != null) {
          let eventArray: ApiEvent[] = [event];
          let flyerPaths: string[] = [event.flyerPath];

          const eventFlyer = await getFlyerImages(flyerPaths);

          const mappedEvents = mapApiEventsToXevents(eventArray, eventFlyer);
          setEvent(mappedEvents[0]);
        }
      } catch (error) {
        console.error("Failed to fecth event with ID = ", eventId, "\n", error);
      }
    };

    loadEvent();
  }, []);

  return (
    <div>
      <span>This is the purchase page.</span>
      <span>Selected event: {event?.id}</span>
      <span>{event?.name}</span>
      <div>
        <Image
          src={`data:image/jpeg;base64,${event?.flyer.img}`}
          alt={event ? event.flyer.alt : "Flyer"}
          width={400}
          height={400}
          className="rounded-lg object-cover w-40 md:w-50"
        />
      </div>
    </div>
  );
}
