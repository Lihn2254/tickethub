import QRCode from 'qrcode';

export default function generateQRCode(ticketId: string) {
    const canvas = document.getElementById('qrcode-canvas') as HTMLCanvasElement;
    QRCode.toCanvas(canvas, ticketId, { width: canvas.width, margin: 3 }, function (error) {
        if (error) console.error(error);
    });
}