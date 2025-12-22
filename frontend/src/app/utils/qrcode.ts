import QRCode from 'qrcode';

export default function generateQRCode(ticketId: number) {
    const canvas = document.getElementById('qrcode-canvas') as HTMLCanvasElement;
    const strTicketId: string = ticketId.toString();
    QRCode.toCanvas(canvas, strTicketId, { width: canvas.width, margin: 3 }, function (error) {
        if (error) console.error(error);
    });
}