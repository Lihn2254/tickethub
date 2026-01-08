import Image from "next/image";
import { ApiTicket, Ticket } from "../types/ticketTypes";
import { useState, useEffect, useRef } from "react";
import Modal from "./Modal";
import generateQRCodeToCanvas from "../utils/qrcode";
import { formatLocationToSearchParam, formatDatetime } from "../utils/utils";
import PrintButton from "./PrintButton";
import { useOutsideClick } from "../hooks/useOutsideClick";

function QRmodal({
  ticketId,
  isOpen,
  onClose,
}: {
  ticketId: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (isOpen) {
      // setTimeout to ensure the canvas is rendered before calling generateQRCode
      const timer = setTimeout(() => {
        generateQRCodeToCanvas(ticketId);
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

export default function TicketCard({
  ticket,
  optionsAvaliable,
}: {
  ticket: Ticket;
  optionsAvaliable: boolean;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const city = ticket.event.location.city;
  const address = ticket.event.location.address;

  useOutsideClick(containerRef, () => {
    isOptionsOpen ? setIsOptionsOpen(false) : null;
  });

  const { date, time } = formatDatetime(ticket.event.startTime);

  const onModalClose = () => setIsModalOpen(false);

  const showOptions = () => setIsOptionsOpen(!isOptionsOpen);

  const cancelOrder = () => alert("Your order was NOT canceled"); //TODO

  return (
    <article className="bg-white border-2 rounded-2xl p-6 shadow-lg border-light-blue max-w-3xl h-fit flex flex-row relative">
      <Image
        src={`data:image/jpeg;base64,${ticket.event.flyer.img}`}
        alt={ticket.event.flyer.alt}
        width={150}
        height={150}
        className="rounded-lg object-cover"
      />

      {/* Ticket info */}
      <div className="flex flex-col flex-1 ml-6">
        <p className="funnel-text mb-1">#{ticket.id}</p>
        <h1 className="text-3xl font-bold text-blue mb-6">
          {ticket.event.name}
        </h1>
        <a
          href={`https://www.google.com/maps/search/${formatLocationToSearchParam(
            city,
            address
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg hover:underline"
        >{`${city} — ${
          address.includes(",")
            ? address.substring(0, address.indexOf(","))
            : address
        }`}</a>
        <span className="funnel-text text-xl font-semibold pb-3 text-gray-700">
          {date + " | " + time}
        </span>
        <p>Attendees: {ticket.attendees}</p>
      </div>

      {/* Buttons */}
      <div className="flex flex-col ml-10">
        <div className="flex-1">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="border-yellow border-3 p-1 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-105"
          >
            <Image
              src={"/icons/qrcode.svg"}
              alt="qrcode"
              width={40}
              height={40}
            />
          </button>
          <PrintButton ticket={ticket} />
        </div>
        <div ref={containerRef} className="self-end">
          {optionsAvaliable ? (
            <button
              type="button"
              onClick={showOptions}
              className="self-end p-1 rounded-full hover:bg-light-gray"
            >
              <img src="/icons/options.svg" alt="options" width={35} />
            </button>
          ) : null}
          {isOptionsOpen ? (
            <button
              type="button"
              onClick={cancelOrder}
              className="absolute bottom-6 right-18 py-2 px-4 border border-gray-200 bg-gray-50 rounded-3xl font-medium hover:text-red-500 hover:font-semibold"
            >
              Cancel order
            </button>
          ) : null}
        </div>
      </div>

      <QRmodal
        ticketId={ticket.id}
        isOpen={isModalOpen}
        onClose={onModalClose}
      />
    </article>
  );
}
