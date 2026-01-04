import { ApiTicket } from "../types/ticketTypes";
import { Client } from "../types/userTypes";
import { apiUrl } from "../api";

export default async function getTickets(client: Client): Promise<ApiTicket[]> {
    const params = new URLSearchParams();

    if (client.id != null) {
        params.append('client_id', client.id?.toString());
    }

    const queryString = params.toString();

    const res = await fetch(`${apiUrl}/tickets?${queryString}`);

    return res.json()
}

export async function createNewTicket(clientId: number, eventId: number, attendees: number): Promise<ApiTicket> {
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