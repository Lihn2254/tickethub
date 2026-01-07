import { Flyer } from "./eventTypes";

export type ApiTicket = {
    id: string;
    status: number;
    //qrCode: string;
    purchasePrice: number;
    attendees: number;
    order: {
        id: number;
        orderDate: Date;
        totalAmount: number;
        paymentStatus: number;
        client: {
            id: number;
            email: string;
            username: string;
        }
    };
    event: ApiTicketEvent;
}

export type Ticket = {
    id: string;
    status: number;
    //qrCode: string;
    purchasePrice: number;
    attendees: number;
    order: {
        id: number;
        orderDate: Date;
        totalAmount: number;
        paymentStatus: number;
        client: {
            id: number;
            email: string;
            username: string;
        }
    };
    event: TicketEvent;
}

type TicketEvent = {
    id: string;
    name: string;
    flyer: Flyer;
    location: { city: string; address: string };
    startTime: Date;
}

type ApiTicketEvent = {
    id: string;
    name: string;
    flyerPath: string;
    city: string;
    address: string;
    startTime: Date;
}