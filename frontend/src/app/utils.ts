export const apiUrl: string = 'http://localhost:8080/api';

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