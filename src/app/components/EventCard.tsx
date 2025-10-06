import Image from "next/image";

export default function EventCard(event: {
  eventName: string;
  flyer: { src: string; alt: string };
  subtitle: string;
  description: string;
  artists: string[];
}) {
  return (
    <article className="max-w-3xl mx-auto bg-white border-2 rounded-2xl p-6 shadow-lg border-blue min-h-80 min-w-110">
      <h1 className="text-3xl font-bold text-blue mb-6">{event.eventName}</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0">
          <Image
            src={event.flyer.src}
            alt={event.flyer.alt}
            width={200}
            height={400}
            className="rounded-lg object-cover w-full md:w-48"
          />
        </div>
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold text-gray-700">
            {event.subtitle}
          </h2>
          <p className="text-gray-600 mt-2 pb-3 ">{event.description}</p>
          <hr/>
          <p className="text-gray-600 pt-3 pb-1 font-semibold">On stage: </p>
          <ul>
            {event.artists.map(artist => <li key={artist} className="text-gray-600 pb-0.5">{artist}</li>)}
          </ul>
          <button className="border-yellow border-2 text-yellow font-bold mt-5 py-2 px-4 rounded-lg hover:bg-primary-hover transition-colors self-stretch">
            Buy Tickets
          </button>
        </div>
      </div>
    </article>
  );
}
