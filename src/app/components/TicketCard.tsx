import Image from "next/image";

export default function TicketCard({
  ticket,
}: {
  ticket: {
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
  };
}) {
  const date = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
  }).format(ticket.event.startTime);

  const time = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(ticket.event.startTime.getDate());

  return (
    <article className="bg-white border-2 rounded-2xl p-6 shadow-lg border-light-blue max-w-3xl h-fit flex flex-row">
      <Image
        src={ticket.event.flyer.src}
        alt={ticket.event.flyer.alt}
        width={150}
        height={150}
      />

      {/* Ticket info */}
      <div className="ml-6">
        <p className="funnel-text mb-1">#{ticket.ticketId}</p>
        <h1 className="text-3xl font-bold text-blue mb-6">
          {ticket.event.eventName}
        </h1>
        <h3 className="text-lg">{ticket.event.location.city}</h3>
        <h2 className="funnel-text text-xl font-semibold pb-3 text-gray-700">
          {date + ' - ' + time}
        </h2>
        <p>Attendees: {` ${ticket.attendees}`}</p>
      </div>

      {/* Buttons */}
      <div className="ml-10">
        <button className="border-yellow border-3 p-1 rounded-2xl">
          <Image src={"/qrcode.svg"} alt="qrcode" width={40} height={40} />
        </button>
        <button className="border-yellow border-3 p-1 rounded-2xl ml-2">
          <Image src={"/print.svg"} alt="print" width={40} height={40} />
        </button>
      </div>
    </article>
  );
}
