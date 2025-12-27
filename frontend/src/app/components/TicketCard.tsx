import Image from "next/image";
import { ApiTicket, Ticket } from "../types/ticketTypes";
import { useState, useEffect } from "react";
import Modal from "./Modal";
import generateQRCode from "../utils/qrcode";
import { convertLocationToSearchParam } from "../utils/utils";

function QRmodal({
  ticketId,
  isOpen,
  onClose,
}: {
  ticketId: number;
  isOpen: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (isOpen) {
      // setTimeout to ensure the canvas is rendered before calling generateQRCode
      const timer = setTimeout(() => {
        generateQRCode(ticketId);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isOpen, ticketId]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="QR Code">
      <canvas id="qrcode-canvas" className="p-1 w-full h-full"></canvas>
    </Modal>
  );
}

export default function TicketCard(ticket: Ticket) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const city = ticket.event.location.city;
  const address = ticket.event.location.address;

  const date = ticket.event.startTime.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const time = ticket.event.startTime.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const onModalClose = () => setIsModalOpen(false);

  return (
    <article className="bg-white border-2 rounded-2xl p-6 shadow-lg border-light-blue max-w-3xl h-fit flex flex-row">
      <Image
        src={`data:image/jpeg;base64,${ticket.event.flyer.img}`}
        alt={ticket.event.flyer.alt}
        width={150}
        height={150}
      />

      {/* Ticket info */}
      <div className="flex flex-col ml-6">
        <p className="funnel-text mb-1">#{ticket.id}</p>
        <h1 className="text-3xl font-bold text-blue mb-6">
          {ticket.event.name}
        </h1>
        <a
          href={`https://www.google.com/maps/search/${convertLocationToSearchParam(
            city,
            address
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg hover:underline"
        >{`${city} — ${address.includes(',') ? address.substring(0, address.indexOf(',')) : address}`}</a>
        <span className="funnel-text text-xl font-semibold pb-3 text-gray-700">
          {date + " | " + time}
        </span>
        <p>Attendees: {ticket.attendees}</p>
      </div>

      {/* Buttons */}
      <div className="ml-10">
        <button
          onClick={() => setIsModalOpen(true)}
          className="border-yellow border-3 p-1 rounded-2xl"
        >
          <Image
            src={"/icons/qrcode.svg"}
            alt="qrcode"
            width={40}
            height={40}
          />
        </button>
        <button className="border-yellow border-3 p-1 rounded-2xl ml-2">
          <Image
            src={"/icons/download.svg"}
            alt="print"
            width={40}
            height={40}
          />
        </button>
      </div>

      <QRmodal
        ticketId={ticket.id}
        isOpen={isModalOpen}
        onClose={onModalClose}
      />
    </article>
  );
}
