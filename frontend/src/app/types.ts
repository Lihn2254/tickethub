type Xevent = {
    id: number;
    name: string;
    flyer: { src: string; alt: string };
    genre: string[];
    subtitle: string;
    description: string;
    location: { city: string; address: string };
    startTime: Date;
    artists: string[];
}

type Ticket = {
    id: number;
    event: {
        id: number;
        name: string;
        flyer: { src: string; alt: string };
        location: { city: string; address: string };
        startTime: Date;
    };
    qrcode: string;
    status: number;
    attendees: number;
}

interface User {
  id: number;
  email: string;
  username: string;
  registrationDate: Date;
}