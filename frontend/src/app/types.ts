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

interface UserBase {
    userId: number | null;
    email: string;
    username: string;
    password: string | null;
    registrationDate: Date | null;
}

interface Client extends UserBase {
    userType: 'client';
    id: number | null;
    name: string;
    lastname: string;
    gender: string;
    birthDate: Date | null;
    phone: string;
}

interface Organization extends UserBase {
    userType: 'organization';
    id: number | null;
    name: string;
    socials: string[];
}

type User = Client | Organization;

// interface User {
//   id: number | null;
//   email: string;
//   username: string;
//   password: string | null;
//   registrationDate: Date | null;
// }

// interface Client {
//     user: User;
//     id: number | null;
//     name: string;
//     lastname: string;
//     gender: string;
//     birthDate: Date | null;
//     phone: string;
// }

// interface Organization {
//     user: User;
//     id: number | null;
//     name: string;
//     socials: string[];
// }

