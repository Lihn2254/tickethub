export type Xevent = {
  id: number;
  name: string;
  flyer: { img: string | null; ext: string | null; alt: string };
  genre: string[];
  subtitle: string;
  description: string;
  location: { city: string; address: string };
  startTime: Date;
  price: number;
  maxAttendees: number;
  avaliablePlaces: number;
  status: number;
  artists: string[];
};

export type ApiEvent = {
  id: number;
  flyerPath: string;
  name: string;
  genre: string;
  subtitle: string;
  description: string;
  city: string;
  address: string;
  startTime: string;
  price: number;
  maxAttendees: number;
  avaliablePlaces: number;
  status: number;
  organizers: { id: number; name: string }[];
  artists: { id: number; name: string }[];
};

export type ApiFlyer = {
  img: string;
  ext: string;
} | null;