import { ApiTicket, TicketStatus } from "../types/ticketTypes";
import { Client } from "../types/userTypes";
import { apiUrl } from "../api";
import { useSearchParams } from "next/navigation";

export default async function getTickets(client: Client): Promise<ApiTicket[]> {
    const params = new URLSearchParams();

    if (client.id != null) {
        params.append('client_id', client.id?.toString());
    }

    const queryString = params.toString();

    const res = await fetch(`${apiUrl}/tickets?${queryString}`);

    return res.json()
}

export async function createNewTicket(clientId: string, eventId: string, attendees: number): Promise<ApiTicket> {
    const res = await fetch(`${apiUrl}/tickets`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientId, eventId, attendees }),
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message);
    }

    return res.json();
}

export async function udpateTicketStatus(ticketId: string, clientId: string, newStatus: number): Promise<ApiTicket>  {
    const res = await fetch(`${apiUrl}/tickets`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ticketId, clientId, newStatus: 2 }),
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message);
    }

    return res.json();
}

export const cancelTicket = (ticketId: string, clientId: string) => udpateTicketStatus(ticketId, clientId, TicketStatus.CANCELLED);

export async function checkRefundAvailability(ticketId: string): Promise<boolean>  {
    const params = new URLSearchParams();

    params.append('ticket_id', ticketId);

    const res = await fetch(`${apiUrl}/tickets/refund?${params.toString()}`);
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message);
    }

    return res.json();
}