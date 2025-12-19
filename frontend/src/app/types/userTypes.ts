interface UserBase {
    id: number | null;
    email: string;
    username: string;
    password: string | null;
    registrationDate: Date | null;
}

export interface Client extends UserBase {
    accountType: 'client';
    name: string;
    lastname: string;
    gender: string;
    birthDate: Date | null;
    phone: string;
}

export interface Organizer extends UserBase {
    accountType: 'organizer';
    name: string;
    socials: string[];
}

export type User = Client | Organizer;