type Xevent = {
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

interface UserBase {
    id: number | null;
    email: string;
    username: string;
    password: string | null;
    registrationDate: Date | null;
}

interface Client extends UserBase {
    accountType: 'client';
    name: string;
    lastname: string;
    gender: string;
    birthDate: Date | null;
    phone: string;
}

interface Organizer extends UserBase {
    accountType: 'organizer';
    name: string;
    socials: string[];
}

type User = Client | Organizer;