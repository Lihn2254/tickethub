export type Ticket = {
    id: number;
    event: {
        id: number;
        name: string;
        flyer: { src: string; alt: string };
        location: { city: string; address: string };
        startTime: Date;
    };
    qrcode: string;
    status: number;
    attendees: number;
}