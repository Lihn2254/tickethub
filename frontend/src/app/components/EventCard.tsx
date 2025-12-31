"use client";

import Image from "next/image";
import { Xevent } from "../types/eventTypes";
import { convertLocationToSearchParam } from "../utils/utils";
import Link from "next/link";

export default function EventCard(event: Xevent) {
  const date = event.startTime.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const time = event.startTime.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const handleClick = () => {
    console.log("Nya! x3 You clicked on me")
  }

  const isSoldOut = () => {
    if (event.avaliablePlaces == 0) {
      return (
        <button
          type="button"
          disabled={true}
          className="border-gray-400 border-2 text-gray-400 font-bold mt-5 py-3 px-4 rounded-lg hover:bg-primary-hover self-stretch"
        >
          Sold Out!
        </button>
      );
    } else {
      return (
        <Link
          href={{
            pathname: '/purchase',
            query: { event_id: event.id }
          }}
          onClick={handleClick}
          className="border-yellow hover:border-darker-blue hover:text-darker-blue transition-all duration-300 hover:scale-105 border-2 text-center text-yellow font-bold mt-5 py-3 px-4 rounded-lg hover:bg-primary-hover self-stretch"
        >
          Get Tickets
        </Link>
      );
    }
  };

  return (
    // 2xl:w-1/2
    <article className="bg-white border-2 rounded-2xl p-6 shadow-lg border-light-blue w-full sm:w-9/12 md:w-7/12 lg:w-5/12 2xl:w-4/12 h-fit">
      <h1 className="text-3xl font-bold text-blue mb-6">{event.name}</h1>
      <div className="flex md:flex-row flex-col gap-6">
        <div className="shrink-0 self-center">
          <Image
            src={`data:image/jpeg;base64,${event.flyer.img}`}
            alt={event.flyer.alt}
            width={400}
            height={400}
            className="rounded-lg object-cover w-40 md:w-50"
          />
        </div>
        <div className="flex flex-col w-full">
          <a
            href={`https://www.google.com/maps/search/${convertLocationToSearchParam(
              event.location.city,
              event.location.address
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg hover:underline"
          >{`${event.location.city} — ${event.location.address}`}</a>
          <span className="funnel-text text-xl font-semibold pb-3 text-gray-700">
            {date + " - " + time}
          </span>
          {/* <h2 className="text-xl font-semibold text-gray-700">
            {event.subtitle}
          </h2>
          <p className="text-gray-600 mt-2 pb-3 ">{event.description}</p>
          <hr/> */}
          <hr />
          <div className="flex-1">
            <p className="text-gray-600 pt-3 pb-1 font-semibold">On stage: </p>
            <ul>
              {event.artists.map((artist) => (
                <li key={artist} className="text-gray-600 pb-0.5">
                  {artist}
                </li>
              ))}
            </ul>
          </div>

          {isSoldOut()}
        </div>
      </div>
    </article>
  );
}
