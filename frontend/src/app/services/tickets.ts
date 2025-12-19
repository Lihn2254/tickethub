import { ApiTicket } from "../types/ticketTypes";
import { Client } from "../types/userTypes";
import { apiUrl } from "../api";

export default async function getTickets(client: Client) : Promise<ApiTicket[]> {
    const params = new URLSearchParams();
    
    if (client.id != null) {
       params.append('client_id', client.id?.toString()); 
    }

    const queryString = params.toString();

    const res = await fetch(`${apiUrl}/tickets?${queryString}`);

    return res.json()
}