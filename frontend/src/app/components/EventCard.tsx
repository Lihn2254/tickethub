'use client';

import Image from "next/image";
import { stringify } from "querystring";

export default function EventCard(event: Xevent) {
  const date = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(event.startTime);

  const time = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(event.startTime.getDate());

  const handleClick = () => {
    console.log('Nya! X3 You clicked on me!');
  }

  return (
    <article className="bg-white border-2 rounded-2xl p-6 shadow-lg border-light-blue w-full lg:w-5/12 2xl:w-1/4 h-fit">
      <h1 className="text-3xl font-bold text-blue mb-6">{event.name}</h1>
      <div className="flex md:flex-row flex-col gap-6">
        <div className="flex-shrink-0 self-center">
          <Image
            src={event.flyer.src}
            alt={event.flyer.alt}
            width={400}
            height={400}
            className="rounded-lg object-cover w-40 md:w-50"
          />
        </div>
        <div className="flex flex-col">
          <h3 className="text-lg">{event.location.city}</h3>
          <h2 className="funnel-text text-xl font-semibold pb-3 text-gray-700">
            {date + " | " + time}
          </h2>
          {/* <h2 className="text-xl font-semibold text-gray-700">
            {event.subtitle}
          </h2>
          <p className="text-gray-600 mt-2 pb-3 ">{event.description}</p>
          <hr/> */}
          <hr />
          <p className="text-gray-600 pt-3 pb-1 font-semibold">On stage: </p>
          <ul>
            {event.artists.map((artist) => (
              <li key={artist} className="text-gray-600 pb-0.5">
                {artist}
              </li>
            ))}
          </ul>
          <button type="button" onClick={handleClick} className="border-yellow hover:border-darker-blue hover:text-darker-blue transition-all duration-300 hover:scale-105 border-2 text-yellow font-bold mt-5 py-2 px-4 rounded-lg hover:bg-primary-hover self-stretch">
            Buy Tickets
          </button>
        </div>
      </div>
    </article>
  );
}
