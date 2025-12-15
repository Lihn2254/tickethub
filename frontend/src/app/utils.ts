import { Xevent, ApiEvent, ApiFlyer } from "./types/eventTypes";
import { User } from "./types/userTypes";

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
      artists: event.artists.map((artist) => artist.name),
    };
  });
}