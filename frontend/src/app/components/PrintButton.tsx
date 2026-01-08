import { Ticket } from "../types/ticketTypes";
import { printTicket } from "../utils/print";

export default function PrintButton({ ticket }: { ticket: Ticket }) {
  return (
    <button
      type="button"
      onClick={() => printTicket(ticket)}
      className="border-yellow border-3 p-1 rounded-2xl ml-2 cursor-pointer transition-all duration-300 hover:scale-105"
    >
      <img src={"/icons/download.svg"} alt="print" width={40} height={40} />
    </button>
  );
}