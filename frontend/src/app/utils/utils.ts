import { Xevent, ApiEvent, ApiFlyer } from "../types/eventTypes";
import { ApiTicket, Ticket } from "../types/ticketTypes";
import { User } from "../types/userTypes";

//Type guard
export function typeGuard(user: User, clientFn: () => void, organizerFn: () => void): void {
    switch (user.accountType) {
        case "client": {
            clientFn();
            break;
        }
        case "organizer": {
            organizerFn();
            break;
        }
    }
}

export const convertLocationToSearchParam = (city: string, address: string) => {
    return address.includes(',') ? `${city} ${address.substring(0, address.indexOf(','))}`.split(" ").join("+") : `${city} ${address}`.split(" ").join("+");
  };

// Map ApiEvent to Xevent
export function mapApiEventsToXevents(apiEvents: ApiEvent[], apiFlyers: ApiFlyer[]): Xevent[] {
  return apiEvents.map((event, index) => {
    
    // Get the matching flyer using the same index
    const currentFlyer = apiFlyers[index];

    return {
      id: event.id,
      name: event.name,
      flyer: {
        // Use the attributes from the flyer object
        // We use optional chaining (?.) just in case apiFlyers is shorter than apiEvents
        img: currentFlyer?.img ?? null, 
        ext: currentFlyer?.ext ?? null,
        alt: event.name,
      },
      genre: event.genre.split(',').map(g => g.trim()),
      subtitle: event.subtitle,
      description: event.description,
      location: {
        city: event.city,
        address: event.address,
      },
      startTime: new Date(event.startTime),
      price: event.price,
      maxAttendees: event.maxAttendees,
      avaliablePlaces: event.avaliablePlaces,
      status: event.status,
      artists: event.artists.map((artist) => artist.name),
    };
  });
}

export function mapApiTicketsToTickets(apiTickets: ApiTicket[], apiFlyers: ApiFlyer[]): Ticket[] {
  return apiTickets.map((ticket, index) => {
    const currentFlyer = apiFlyers[index];

    return {
      id: ticket.id,
      status: ticket.status,
      //qrCode: ticket.qrCode,
      purchasePrice: ticket.purchasePrice,
      attendees: ticket.attendees,
      order: {
        id: ticket.order.id,
        orderDate: new Date(ticket.order.orderDate),
        totalAmount: ticket.order.totalAmount,
        paymentStatus: ticket.order.paymentStatus,
        client: {
          id: ticket.order.client.id,
          email: ticket.order.client.email,
          username: ticket.order.client.username
        }
      },
      event: {
        id: ticket.event.id,
        name: ticket.event.name,
        flyer: {
          img: currentFlyer?.img ?? null,
          ext: currentFlyer?.ext ?? null,
          alt: ticket.event.name
        },
        location: {
          city: ticket.event.city,
          address: ticket.event.address
        },
        startTime: new Date(ticket.event.startTime)
      }
    }
  });
}