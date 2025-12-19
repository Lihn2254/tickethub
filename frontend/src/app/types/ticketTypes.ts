export type ApiTicket = {
    id: number;
    status: number;
    qrCode: string;
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
    id: number;
    status: number;
    qrCode: string;
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
    id: number;
    name: string;
    flyer: { img: string | null; ext: string | null; alt: string };
    location: { city: string; address: string };
    startTime: Date;
}

type ApiTicketEvent = {
    id: number;
    name: string;
    flyerPath: string;
    city: string;
    address: string;
    startTime: Date;
}