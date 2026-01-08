import jsPDF from "jspdf";
import { Ticket } from "../types/ticketTypes";
import QRCode from 'qrcode';
import { getImageDimensions } from "./image";
import { formatPrice } from "./utils";

export const printTicket = async (ticket: Ticket) => {
  const rawBase64 = ticket.event.flyer.img;
  const imageSrc = rawBase64 ? `data:image/jpeg;base64,${rawBase64}` : null;

  const print = async () => {
    const doc = new jsPDF();

    await Promise.all([
      addFontToDoc(doc, "/fonts/RedHatDisplay-Bold.ttf", "RedHat", "bold"),
      addFontToDoc(doc, "/fonts/RedHatDisplay-Regular.ttf", "RedHat", "normal"),
      addFontToDoc(doc, "/fonts/FunnelDisplay-Regular.ttf", "Funnel", "normal"),
      addFontToDoc(doc, "/fonts/FunnelDisplay-Bold.ttf", "Funnel", "bold"),
    ]);

    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 15; //15mm
    const contentWidth = pageWidth - margin * 2;

    // --- COLORS ---
    const primaryColor = [22, 108, 200]; // Main blue
    const lightGray = [245, 245, 245];
    const darkGray = [50, 50, 50];

    // --- 1. HEADER (Branding) ---
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.rect(0, 0, pageWidth, 32, "F"); // Top bar background

    let yPos = 20;  // Current vertical position

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont("Funnel", "bold");
    doc.text("TicketHub", margin, yPos);
    yPos += 5;
    
    doc.setFont("RedHat", "normal");
    doc.setFontSize(10);
    doc.text("Your gateway to unforgettable events", margin, yPos);
    doc.setFontSize(14);
    doc.text("Your Event Pass", pageWidth - margin, yPos, { align: "right" });

    // --- 2. EVENT TITLE ---
    yPos += 25;
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(28);
    doc.setFont("RedHat", "bold");
    // Split text to wrap if it's too long
    const titleLines = doc.splitTextToSize(ticket.event.name, contentWidth);
    doc.text(titleLines, margin, yPos);
    yPos += titleLines.length * 10;

    // --- 3. FLYER & EVENT DETAILS (2 Columns) ---
    const columnWidth = contentWidth / 2 - 5;

    // Left Column: Flyer
    if (imageSrc) {
      try {
        const { width, height } = await getImageDimensions(imageSrc);
        const ratio = columnWidth / width;
        const finalHeight = height * ratio;

        // Cap height if it's too tall (e.g., portrait flyers)
        const maxHeight = 125;
        let renderHeight;

        renderHeight = finalHeight > maxHeight ? maxHeight : finalHeight;

        doc.addImage(imageSrc, "JPEG", margin, yPos, columnWidth, renderHeight);
      } catch (e) {
        // Fallback placeholder if image fails
        doc.setDrawColor(200);
        doc.rect(margin, yPos, columnWidth, 60);
        doc.text("No Image", margin + 10, yPos + 30);
      }
    }

    // Right Column: Details
    const rightColX = margin + columnWidth + 10;
    let detailsY = yPos + 5;

    // Helper for rows
    const addDetailRow = (label: string, value: string) => {
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.setFont("RedHat", "normal");
      doc.text(label.toUpperCase(), rightColX, detailsY);

      doc.setFontSize(12);
      doc.setTextColor(0);
      doc.setFont("RedHat", "bold");
      doc.text(value, rightColX, detailsY + 5);

      detailsY += 15; // Spacing
    };

    // Format Dates (assuming native Date object or string)
    const eventDate = new Date(ticket.event.startTime).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const eventTime = new Date(ticket.event.startTime).toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' });

    addDetailRow("Date & Time", `${eventDate} at ${eventTime}`);
    addDetailRow("Location", `${ticket.event.location.address}, ${ticket.event.location.city}`);
    addDetailRow("Ticket ID", ticket.id);

    // --- 4. QR CODE ---
    try {
      const qrDataUrl = await QRCode.toDataURL(ticket.id, { margin: 0.2 });
      const qrSize = 55;
      doc.addImage(qrDataUrl, "PNG", rightColX + (columnWidth - qrSize) / 2, detailsY, qrSize, qrSize);
      detailsY += qrSize;
    } catch (err) {
      console.error("QR Generation failed", err);
    }

    // Move Y position down past the flyer section
    yPos = Math.max(yPos + 125, detailsY + 10);

    // --- 5. ORDER SUMMARY BOX ---
    doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
    doc.setDrawColor(200);
    const recHeight = 72;
    doc.roundedRect(margin, yPos, contentWidth, recHeight, 3, 3, "FD");

    let boxY = yPos + 12;
    yPos += recHeight;
    const boxLeft = margin + 10;

    // Client Info
    doc.setFontSize(14);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text("Order Information", boxLeft, boxY);
    boxY += 8;

    doc.setFontSize(10);
    doc.setTextColor(0);
    doc.text('Issued to: ', boxLeft, boxY);
    doc.setFont('RedHat', 'normal');
    doc.text(`${ticket.order.client.name} ${ticket.order.client.lastname} - ${ticket.order.client.username} (${ticket.order.client.email})`, boxLeft + 17, boxY);
    boxY += 6;
    doc.setFont('RedHat', 'bold');
    doc.text('Purchased on: ', boxLeft, boxY);
    doc.setFont('RedHat', 'normal');
    doc.text(`${new Date(ticket.order.orderDate).toLocaleDateString()}`, boxLeft + 25, boxY);

    // Line Divider inside box
    boxY += 8;
    doc.setDrawColor(200);
    doc.line(boxLeft, boxY, pageWidth - margin - 10, boxY);
    boxY += 8;

    // Pricing Columns
    const col1 = boxLeft;
    const col2 = boxLeft + 60;
    const col3 = boxLeft + 110;

    // Headers
    doc.setFont("RedHat", "bold");
    doc.text("Type", col1, boxY);
    doc.text("Qty", col2, boxY);
    doc.text("Unit price", col3, boxY);
    boxY += 8;

    // Values
    doc.setFont("RedHat", "normal");
    doc.text("General Admission", col1, boxY);
    doc.text(`${ticket.attendees}`, col2, boxY);
    doc.text(`${formatPrice(ticket.purchasePrice)} MXN`, col3, boxY);

    // Total Calculation (Bottom Right of Box)
    doc.setFontSize(16);
    doc.setFont("RedHat", "bold");
    const totalText = `Total: ${formatPrice(ticket.order.totalAmount)} MXN`;
    doc.text(totalText, pageWidth - boxLeft, boxY + 15, { align: "right" });

    // --- 6. FOOTER ---
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text("Please present this ticket at the entrance. Duplicates will not be accepted.", pageWidth / 2, yPos + 10, { align: "center" });

    // Save
    doc.save(`Ticket_${ticket.id} - ${ticket.event.name}.pdf`);
  };

  print();
}

const addFontToDoc = async (doc: jsPDF, fontPath: string, fontName: string, fontStyle: string) => {
  const response = await fetch(fontPath);
  const blob = await response.blob();

  return new Promise<void>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      // FileReader returns "data:font/ttf;base64,AAEAAA..."
      // We only need the base64 part after the comma
      const base64data = (reader.result as string).split(",")[1];

      // Add file to Virtual File System
      doc.addFileToVFS(`${fontName}-${fontStyle}.ttf`, base64data);
      // Register the font
      doc.addFont(`${fontName}-${fontStyle}.ttf`, fontName, fontStyle);
      resolve();
    };
    reader.readAsDataURL(blob);
  });
};