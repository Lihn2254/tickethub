import { Xevent, ApiEvent } from "./types/event";
import { User } from "./types/user";

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

// Generates the alt text for an image given its name.
function generateAltText(src: string): string {
  const filename = src.substring(src.lastIndexOf('/') + 1);
  const nameWithoutExt = filename.split('.')[0];
  const withSpaces = nameWithoutExt.replace(/_/g, ' ');

  return withSpaces
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Map ApiEvent to Xevent
export function mapApiEventsToXevents(apiEvents: ApiEvent[]): Xevent[] {
  return apiEvents.map((event) => ({
    id: event.id,
    name: event.name,
    flyer: {
      src: event.flyer,
      alt: generateAltText(event.flyer),
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
  }));
}