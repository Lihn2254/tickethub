import EventCard from "../components/EventCard";

export default function Home() {
  const events: {
    id: number;
    flyer: { src: string; alt: string };
    eventName: string;
    genre: string[];
    subtitle: string;
    description: string;
    location: {city: string, address: string};
    startTime: Date;
    artists: string[];
  }[] = [
    {
      id: 1,
      eventName: "Halloween on the Little Castle",
      flyer: { 
        src: "/poster.jpg", 
        alt: "Event image" },
      genre: ['Rock, Indie, Metal'],
      subtitle: `Blood, ghosts, spirits... and cool music!`,
      description:
        "On this new edition of the classic local rock event you are going to see some faces rise from the dead.",
      location: {city: 'Culiacán, Sin.', address: 'Av. Teotihuacán 1234'},
      startTime: new Date("December 17, 1995 17:00:00"),
      artists: ["Artist 1", "Artist 2", "Artist 3"],
    },
    {
      id: 2,
      eventName: "Summer Acoustic Sessions",
      flyer: {
        src: "/reggaeton_poster.jpg",
        alt: "A guitar leaning against a tree at sunset",
      },
      genre: ['Rock, Indie, Metal'],
      subtitle: "Unplugged melodies under the stars.",
      description:
        "Join us for a relaxing evening with the best local acoustic talent. A perfect night for music lovers.",
      location: {city: 'Culiacán, Sin.', address: 'Av. Teotihuacán 1234'},
      startTime: new Date("December 17, 1995 17:00:00"),
      artists: ["Sunset Strummers", "River Reed", "Luna Leigh"],
    },
    {
      id: 3,
      eventName: "Electro Groove Fest",
      flyer: {
        src: "/electronic_poster.jpg",
        alt: "Colorful laser lights at a dance festival",
      },
      genre: ['Rock, Indie, Metal'],
      subtitle: "Dance all night to electrifying beats.",
      description:
        "The city's biggest electronic music festival is back! Featuring international DJs and stunning visual effects.",
      location: {city: 'Culiacán, Sin.', address: 'Av. Teotihuacán 1234'},
      startTime: new Date("December 17, 1995 17:00:00"),
      artists: ["DJ Pulse", "Synthwave Rider", "Techno Twins"],
    },
    {
      id: 4,
      eventName: "Jazz & Wine Night",
      flyer: {
        src: "/jazz_poster.jpg",
        alt: "A saxophone and a glass of red wine on a table",
      },
      genre: ['Rock, Indie, Metal'],
      subtitle: "Smooth tunes and fine wines.",
      description:
        "An elegant evening dedicated to the timeless sounds of jazz. Each ticket includes a complimentary glass of wine.",
      location: {city: 'Culiacán, Sin.', address: 'Av. Teotihuacán 1234'},
      startTime: new Date("December 17, 1995 17:00:00"),
      artists: ["The Velvet Keys Trio", "Saxophone Soul", "Diana Verse"],
    },
    {
      id: 5,
      eventName: "Rock Revival Tour",
      flyer: {
        src: "/metal_poster.jpg",
        alt: "A rock band performing on a brightly lit stage",
      },
      genre: ['Rock, Indie, Metal'],
      subtitle: "Classic rock anthems that never die.",
      description:
        "Get ready to headbang! A lineup of legendary bands is here to play all the hits that shaped a generation.",
      location: {city: 'Culiacán, Sin.', address: 'Av. Teotihuacán 1234'},
      startTime: new Date("December 17, 1995 17:00:00"),
      artists: ["Static Rebellion", "Crimson Hex", "Voltage Valley"],
    },
    {
      id: 6,
      eventName: "Indie Folk Gathering",
      flyer: {
        src: "/indie_poster.jpg",
        alt: "A person playing an acoustic guitar in a rustic barn",
      },
      genre: ['Rock, Indie, Metal'],
      subtitle: "Heartfelt lyrics and rustic charm.",
      description:
        "Discover your new favorite indie folk artists in an intimate and cozy setting. Pure, authentic music.",
      location: {city: 'Culiacán, Sin.', address: 'Av. Teotihuacán 1234'},
      startTime: new Date("December 17, 1995 17:00:00"),
      artists: ["The Wandering Bards", "Willow Creek", "Samuel Finch"],
    },
  ];

  return (
    <div className="items-center justify-items-center min-h-screen p-8 pb-20 sm:pr-20 sm:pl-20 sm:p-10">
      <h1 className="mb-10 text-5xl funnel-text font-medium">
        Upcoming events
      </h1>
      <p className="pb-8 text-red-600">Aquí poner opciones de filtrado.</p>
      <main className="flex flex-wrap gap-6 justify-center">
        {events.map((event) => (
          <EventCard
            key={event.id}
            eventName={event.eventName}
            flyer={event.flyer}
            subtitle={event.subtitle}
            description={event.description}
            location={event.location}
            startTime={event.startTime}
            artists={event.artists}
          />
        ))}
      </main>
    </div>
  );
}
