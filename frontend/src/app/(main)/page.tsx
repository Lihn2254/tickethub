"use client";

import { useRouter } from "next/navigation";
import EventCard from "../components/EventCard";
import { useEffect, useState } from "react";
import getEvents from "../services/getEvents";

export default function Home() {
  const [events, setEvents] = useState<Xevent[]>([]);
  // const events: Xevent[] = [
  //   {
  //     id: 1,
  //     name: "Halloween on the Little Castle",
  //     flyer: {
  //       src: "/stock/poster.jpg",
  //       alt: "Event image",
  //     },
  //     genre: ["Rock, Indie, Metal"],
  //     subtitle: `Blood, ghosts, spirits... and cool music!`,
  //     description:
  //       "On this new edition of the classic local rock event you are going to see some faces rise from the dead.",
  //     location: { city: "Culiacán, Sin.", address: "Av. Teotihuacán 1234" },
  //     startTime: new Date("December 17, 1995 17:00:00"),
  //     artists: ["Artist 1", "Artist 2", "Artist 3"],
  //   },
  //   {
  //     id: 2,
  //     name: "Summer Acoustic Sessions",
  //     flyer: {
  //       src: "/stock/acoustic_poster.jpg",
  //       alt: "A guitar leaning against a tree at sunset",
  //     },
  //     genre: ["Rock, Indie, Metal"],
  //     subtitle: "Unplugged melodies under the stars.",
  //     description:
  //       "Join us for a relaxing evening with the best local acoustic talent. A perfect night for music lovers.",
  //     location: { city: "Culiacán, Sin.", address: "Av. Teotihuacán 1234" },
  //     startTime: new Date("December 17, 1995 17:00:00"),
  //     artists: ["Sunset Strummers", "River Reed", "Luna Leigh"],
  //   },
  //   {
  //     id: 3,
  //     name: "Electro Groove Fest",
  //     flyer: {
  //       src: "/stock/electronic_poster.jpg",
  //       alt: "Colorful laser lights at a dance festival",
  //     },
  //     genre: ["Rock, Indie, Metal"],
  //     subtitle: "Dance all night to electrifying beats.",
  //     description:
  //       "The city's biggest electronic music festival is back! Featuring international DJs and stunning visual effects.",
  //     location: { city: "Culiacán, Sin.", address: "Av. Teotihuacán 1234" },
  //     startTime: new Date("December 17, 1995 17:00:00"),
  //     artists: ["DJ Pulse", "Synthwave ReventIder", "Techno Twins"],
  //   },
  //   {
  //     id: 4,
  //     name: "Jazz & Wine Night",
  //     flyer: {
  //       src: "/stock/jazz_poster.jpg",
  //       alt: "A saxophone and a glass of red wine on a table",
  //     },
  //     genre: ["Rock, Indie, Metal"],
  //     subtitle: "Smooth tunes and fine wines.",
  //     description:
  //       "An elegant evening dedicated to the timeless sounds of jazz. Each ticket includes a complimentary glass of wine.",
  //     location: { city: "Culiacán, Sin.", address: "Av. Teotihuacán 1234" },
  //     startTime: new Date("December 17, 1995 17:00:00"),
  //     artists: ["The Velvet Keys Trio", "Saxophone Soul", "Diana Verse"],
  //   },
  //   {
  //     id: 5,
  //     name: "Rock Revival Tour",
  //     flyer: {
  //       src: "/stock/metal_poster.jpg",
  //       alt: "A rock band performing on a brightly lit stage",
  //     },
  //     genre: ["Rock, Indie, Metal"],
  //     subtitle: "Classic rock anthems that never die.",
  //     description:
  //       "Get ready to headbang! A lineup of legendary bands is here to play all the hits that shaped a generation.",
  //     location: { city: "Culiacán, Sin.", address: "Av. Teotihuacán 1234" },
  //     startTime: new Date("December 17, 1995 17:00:00"),
  //     artists: ["Static Rebellion", "Crimson Hex", "Voltage Valley"],
  //   },
  //   {
  //     id: 6,
  //     name: "Indie Folk Gathering",
  //     flyer: {
  //       src: "/stock/indie_poster.jpg",
  //       alt: "A person playing an acoustic guitar in a rustic barn",
  //     },
  //     genre: ["Rock, Indie, Metal"],
  //     subtitle: "Heartfelt lyrics and rustic charm.",
  //     description:
  //       "Discover your new favorite indie folk artists in an intimate and cozy setting. Pure, authentic music.",
  //     location: { city: "Culiacán, Sin.", address: "Av. Teotihuacán 1234" },
  //     startTime: new Date("December 17, 1995 17:00:00"),
  //     artists: ["The Wandering Bards", "Willow Creek", "Samuel Finch"],
  //   },
  // ];

  // useEffect(() => {
  //   const loadEvents = async() => {
  //     try {
  //         const events = await getEvents(null, null, null, null);
  //         setEvents(events);
  //     } catch (error) {
  //       console.error('Failed to fecth events: ', error)
  //     }
  //   }

  //   loadEvents();
  // }, []);

  const loadEvents = async() => {
      try {
          const events = await getEvents(null, null, null, null);
          setEvents(events);
      } catch (error) {
        console.error('Failed to fecth events: ', error)
      }
    }

  return (
    <div className="justify-items-center min-h-screen p-8 pb-20">
      <h1 className="mb-2 text-5xl funnel-text font-medium">Upcoming events</h1>
      <p className="pb-8 pt-7 text-red-600 sticky top-0 text-center w-fit">
        Aquí poner opciones de filtrado.
      </p>
      <main className="flex flex-col lg:flex-row flex-wrap gap-6 justify-center">
        <button onClick={loadEvents} className="rounded-2xl bg-blue">Get Events</button>
        {events.map((event) => (
          <EventCard key={event.id} {...event} />
        ))}
        
      </main>
    </div>
  );
}
