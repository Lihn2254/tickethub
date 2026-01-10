import { Flyer } from "./eventTypes";

export enum TicketStatus {
    USED, ACTIVE, CANCELLED, EXPIRED
}

export enum PaymentStatus {
    PENDING, PAID, REFUNDED
}

export type ApiTicket = {
    id: string;
    status: number;
    //qrCode: string;
    purchasePrice: number;
    attendees: number;
    order: {
        id: string;
        orderDate: Date;
        totalAmount: number;
        paymentStatus: number;
        client: {
            id: string;
            email: string;
            username: string;
            name: string;
            lastname: string;
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
        id: string;
        orderDate: Date;
        totalAmount: number;
        paymentStatus: number;
        client: {
            id: string;
            email: string;
            username: string;
            name: string;
            lastname: string;
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