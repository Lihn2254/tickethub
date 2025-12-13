export type Xevent = {
    id: number;
    name: string;
    flyer: { src: string; alt: string };
    genre: string[];
    subtitle: string;
    description: string;
    location: { city: string; address: string };
    startTime: Date;
    price: number;
    artists: string[];
}

export type ApiEvent = {
  id: number;
  flyer: string;
  name: string;
  genre: string;
  subtitle: string;
  description: string;
  city: string;
  address: string;
  startTime: string;
  price: number;
  artists: { id: number; name: string }[];
  organizers: { id: number; name: string }[];
};