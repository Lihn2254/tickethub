"use client";

import { getEvent, getFlyerImages } from "@/app/services/events";
import { ApiEvent, Xevent } from "@/app/types/eventTypes";
import {
  formatLocationToSearchParam,
  mapApiEventsToXevents,
  formatDatetime,
  formatPrice,
} from "@/app/utils/utils";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus } from "lucide-react";
import { Span } from "next/dist/trace";

export default function Purchase() {
  const [event, setEvent] = useState<Xevent>();
  const [isLoading, setIsLoading] = useState(true);
  const [attendees, setAttendees] = useState(1);
  const [maxAttendees, setMaxAttendees] = useState(false);
  const searchParams = useSearchParams();
  const progressItems = [
    { id: 1, text: "Tickets" },
    { id: 2, text: "Payment" },
    { id: 3, text: "Confirmation" },
  ];

  useEffect(() => {
    const eventId = searchParams.get("event");

    const loadEvent = async () => {
      try {
        setIsLoading(true);
        const event = await getEvent(eventId);

        if (event != null) {
          let eventArray: ApiEvent[] = [event];
          let flyerPaths: string[] = [event.flyerPath];

          const eventFlyer = await getFlyerImages(flyerPaths);

          const mappedEvents = mapApiEventsToXevents(eventArray, eventFlyer);
          const loadedEvent = mappedEvents[0];
          setEvent(loadedEvent);
        }
      } catch (error) {
        console.error("Failed to fecth event with ID = ", eventId, error);
      } finally {
        setIsLoading(false);
      }
    };

    loadEvent();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center w-full min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-blue border-t-transparent rounded-full animate-spin"></div>
          <span className="text-xl text-gray-600">
            Loading event details...
          </span>
        </div>
      </div>
    );
  }

  if (event) {
    return (
      <>
        <section className="flex justify-center items-center bg-blue text-white h-15">
          <div className="flex absolute left-0 mx-3 gap-2">
            <Link href="/" className="p-1 bg-darker-blue rounded-lg">
              <Image
                src="/icons/go_back_white.svg"
                alt="Home"
                width={30}
                height={30}
              ></Image>
            </Link>
            <Link href="/" className="p-1 bg-darker-blue rounded-lg">
              <Image
                src="/icons/home.svg"
                alt="Home"
                width={30}
                height={30}
              ></Image>
            </Link>
          </div>
          <ul className="flex gap-2">
            {progressItems.map((item) => (
              <li key={item.id} className="flex items-center gap-2">
                {item.text}
                {item.id != progressItems.length ? (
                  <img src="/icons/next_arrow.svg" alt="next" width={20} />
                ) : null}
              </li>
            ))}
          </ul>
        </section>
        <main className="flex min-h-150 p-8 mx-45">
          <section>
            <Image
              src={`data:image/jpeg;base64,${event.flyer.img}`}
              alt={event ? event.flyer.alt : "Flyer"}
              width={400}
              height={400}
              className="rounded-lg object-cover w-60 md:w-80"
            />
          </section>

          <section className="flex-1 px-8 items-start">
            <EventInfo {...event} />

            <form className="flex flex-col gap-3 pt-8">
              <label
                htmlFor="attendees_input"
                className="block text-lg font-semibold text-gray-700 tracking-wide"
              >
                Number of tickets
              </label>

              <div className="flex items-center justify-between w-40 px-2 py-1 bg-white border border-gray-200 rounded-full shadow-sm hover:shadow-md transition-all duration-300 hover:border-blue-300">
                {/* DECREASE BUTTON */}
                <button
                  type="button"
                  // Simplified logic: Just decrease and clear any "max" warning
                  onClick={() => {
                    setAttendees(attendees - 1);
                    setMaxAttendees(false);
                  }}
                  disabled={attendees <= 1}
                  className={`p-3 rounded-full transition-colors duration-200 group ${
                    attendees <= 1
                      ? "opacity-30 cursor-not-allowed"
                      : "hover:bg-gray-100 active:bg-gray-200"
                  }`}
                >
                  <Minus size={16} strokeWidth={3} />
                </button>

                {/* INPUT FIELD */}
                <input
                  id="attendees_input"
                  type="text"
                  className="w-12 text-center text-xl font-bold text-gray-800 bg-transparent border-none focus:ring-0 outline-none p-0"
                  value={attendees}
                  onChange={(e) => {
                    const val = e.target.value;

                    // Allow empty string to let user delete everything
                    if (val === "") {
                      setAttendees(0); // Or keep it empty string if you handle that state
                      setMaxAttendees(false);
                      return;
                    }

                    // Only process if it is a number
                    if (/^[0-9\b]+$/.test(val)) {
                      const numVal = Number(val);

                      if (numVal > 10) {
                        setAttendees(10); // Cap the value at 10
                        setMaxAttendees(true); // Show warning
                      } else {
                        setAttendees(numVal);
                        setMaxAttendees(false); // Hide warning if they delete back to safe range
                      }
                    }
                  }}
                />

                {/* INCREASE BUTTON */}
                <button
                  type="button"
                  onClick={() => {
                    if (attendees >= 10) {
                      setMaxAttendees(true);
                    } else {
                      setAttendees(attendees + 1);
                      setMaxAttendees(false);
                    }
                  }}
                  // Optional: Visual disable if you want the button to look disabled at 10
                  // disabled={attendees >= 10}
                  className={`p-3 rounded-full transition-colors duration-200 ${
                    attendees >= 10
                      ? "opacity-50 cursor-not-allowed" // Optional visual cue
                      : "hover:bg-gray-100 active:bg-gray-200"
                  }`}
                >
                  <Plus size={16} strokeWidth={3}></Plus>
                </button>
              </div>

              {/* WARNING MESSAGE */}
              {maxAttendees ? (
                <span className="text-red-500">
                  You can only purchase a maximum of 10 tickets per order.
                </span>
              ) : null}
            </form>
          </section>

          <section className="bg-gray-50 rounded-lg p-6 w-100 h-fit sticky top-8 border border-gray-200">
            <h3 className="text-2xl font-semibold text-blue mb-4">
              Order Summary
            </h3>

            <div className="space-y-4">
              <div className="flex justify-between text-lg">
                <span className="text-gray-700">{event.name}</span>
              </div>

              <hr className="border-gray-300" />

              <div className="flex justify-between text-lg">
                <span className="text-gray-700">Price per ticket</span>
                <span className="font-semibold">
                  {formatPrice(event.price)} MXN
                </span>
              </div>

              <div className="flex justify-between text-lg">
                <span className="text-gray-700">Quantity</span>
                <span className="font-semibold">{attendees}</span>
              </div>

              <hr className="border-gray-300" />

              <div className="flex justify-between text-2xl">
                <span className="font-semibold text-gray-800">Total</span>
                <span className="font-bold text-blue">
                  {formatPrice(event.price * attendees)} MXN
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-blue text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition-colors duration-200"
            >
              Proceed to Payment
            </button>
          </section>
        </main>
      </>
    );
  } else {
    return (
      <div className="flex flex-col flex-1 justify-center items-center w-full min-h-165 p-20 text-3xl text-gray-400">
        <div className="flex flex-col items-center">
          <span>Something went wrong!</span>
          <span>Please try again later</span>
        </div>
        <span className="my-10 text-9xl">o_0</span>
        <Link
          href={"http://localhost:3000"}
          className="mt-10 text-blue-400 funnel-text text-2xl font-light"
        >
          Go to home page
        </Link>
      </div>
    );
  }
}

function EventInfo(event: Xevent) {
  const { date, time } = formatDatetime(event.startTime);

  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <div className="flex flex-col flex-1">
          <span className="text-4xl funnel-text font-semibold text-dark-blue pb-2">
            {event.name}
          </span>
          <span className="text-xl">{event.description}</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-4xl">{formatPrice(event.price)} MXN</span>
          <span className="text-xl">per ticket</span>
        </div>
      </div>

      <hr className="w-full my-4" />

      <div className="flex flex-col">
        <span className="funnel-text text-2xl font-semibold text-gray-700 pb-1">
          {date + " - " + time}
        </span>
        <a
          href={`https://www.google.com/maps/search/${formatLocationToSearchParam(
            event.location.city,
            event.location.address
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl hover:underline"
        >{`${event.location.city} — ${event.location.address}`}</a>
      </div>
      <hr className="w-8 my-7 border-blue border-2" />
      <div>
        <p className="pb-1 font-semibold text-xl text-gray-700">On stage </p>
        <ul>
          {event.artists.map((artist) => (
            <li key={artist} className="text-gray-700 pb-0.5 text-lg">
              {artist}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
