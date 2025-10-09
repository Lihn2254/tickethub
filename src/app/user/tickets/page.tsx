export default function Tickets() {
    const ticketList: {
        eventId: number;
        eventName: string;
        startTime: Date;
        endTime: Date;
        qrcode: string;
        status: number;
    }[] = [{
        eventId: 1,
        eventName: 'Jazz & Wine Night',
        startTime: new Date("December 17, 1995 17:00:00"),
        endTime: new Date("December 17, 1995 20:00:00"),
        qrcode: 'qrcode',
        status: 0
    }]

    return <h1>This is the tickets page.</h1>
}