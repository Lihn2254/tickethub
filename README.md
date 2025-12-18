# TicketHub

A modern event ticketing platform built with Spring Boot and Next.js. This application allows users to browse events, purchase tickets, and manage their ticket collections.


## Project Structure

### Backend (`/backend`)
Java Spring Boot application with Maven build system.

```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/tickethub/
│   │   │   ├── TickethubApplication.java          # Main Spring Boot application
│   │   │   ├── controllers/                       # REST API endpoints
│   │   │   │   ├── EventController.java
│   │   │   │   ├── EventImageController.java
│   │   │   │   └── UserController.java
│   │   │   ├── domain/                            # JPA Entity classes
│   │   │   │   ├── Event.java
│   │   │   │   ├── User.java
│   │   │   │   ├── Artist.java
│   │   │   │   ├── Organizer.java
│   │   │   │   ├── Ticket.java
│   │   │   │   └── Client.java
│   │   │   ├── dto/                               # Data Transfer Objects
│   │   │   │   ├── EventDTO.java
│   │   │   │   ├── ArtistDTO.java
│   │   │   │   └── OrganizerDTO.java
│   │   │   ├── repositories/                      # JPA repositories for database access
│   │   │   │   ├── EventRepository.java
│   │   │   │   ├── UserRepository.java
│   │   │   │   └── ...
│   │   │   └── services/                          # Business logic layer
│   │   │       ├── EventService.java
│   │   │       ├── UserService.java
│   │   │       └── ...
│   │   └── resources/
│   │       ├── application.properties             # Spring Boot configuration
│   │       └── db/
│   │           ├── evant_db_schema.sql           # Database schema (tables, constraints)
│   │           └── mock_data.sql                 # Sample data for testing
│   └── test/                                      # Unit and integration tests
│       └── java/com/tickethub/
├── pom.xml                                        # Maven dependencies and build configuration
├── docker-compose.yml                             # Docker Compose for PostgreSQL
├── mvnw & mvnw.cmd                               # Maven wrapper (Windows/Unix)
└── HELP.md
```

### Frontend (`/frontend`)
Next.js TypeScript application with Tailwind CSS.

```
frontend/
├── src/
│   ├── app/
│   │   ├── globals.css                           # Global styles and TailwindCSS configuration
│   │   ├── layout.tsx                            # Root layout component
│   │   ├── page.tsx                              # Home page
│   │   ├── (auth)/                               # Authentication routes
│   │   │   ├── layout.tsx
│   │   │   ├── login/page.tsx
│   │   │   └── signup/page.tsx
│   │   ├── (main)/                               # Main application routes
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── about/page.tsx
│   │   │   ├── organizer/page.tsx
│   │   │   ├── settings/page.tsx
│   │   │   └── user/
│   │   │       ├── page.tsx
│   │   │       └── tickets/page.tsx
│   │   ├── api.ts                                # API client configuration
│   │   ├── utils.ts                              # Utility functions
│   │   ├── components/                           # Reusable UI components
│   │   │   ├── EventCard.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── TicketCard.tsx
│   │   │   ├── auth/
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   └── SignupForm.tsx
│   │   │   └── header/
│   │   │       ├── Header.tsx
│   │   │       ├── NavBar.tsx
│   │   │       └── UserIcon.tsx
│   │   ├── context/                              # React Context for state management
│   │   │   └── AuthContext.tsx
│   │   ├── hooks/                                # Custom React hooks
│   │   │   └── useOutsideClick.ts
│   │   ├── services/                             # API service functions
│   │   │   ├── auth.ts
│   │   │   └── getEvents.ts
│   │   └── types/                                # TypeScript type definitions
│   │       ├── event.ts
│   │       ├── ticket.ts
│   │       └── user.ts
│   └── public/                                    # Static assets
│       ├── icons/
│       ├── logos/
│       └── stock/
├── next.config.ts                                # Next.js configuration
├── tailwind.config.js                            # Tailwind CSS configuration
├── tsconfig.json                                 # TypeScript configuration
├── postcss.config.mjs                            # PostCSS configuration
├── eslint.config.mjs                             # ESLint configuration
└── package.json                                  # Node.js dependencies
```


## Prerequisites

- **Java 17+** (for backend)
- **Node.js 18+** (for frontend)
- **Docker & Docker Compose** (for PostgreSQL database)
- **PostgreSQL client** (psql) - optional, for manual database operations


## Setup Instructions

### 1. Start PostgreSQL Container with Docker Compose

Navigate to the backend directory and start the PostgreSQL container:

```bash
cd backend
docker-compose up -d
```

This will:
- Start a PostgreSQL container on `localhost:5432`
- Create a database named `tickethub`
- Use the credentials defined in `docker-compose.yml` (default: `postgres` / `password`)

**Verify the container is running:**

```bash
docker-compose ps
```


### 2. Create and Populate the Database

Connect to the database and execute the SQL scripts:

```bash
# Connect to the PostgreSQL database
psql -h localhost -U postgres -d tickethub

# Inside psql, execute the schema file
\i src/main/resources/db/evant_db_schema.sql

# Execute the mock data file
\i src/main/resources/db/mock_data.sql

# Exit psql
\q
```

### 3. Run the Backend

Navigate to the backend directory and start the Spring Boot application:

```bash
cd backend
./mvnw spring-boot:run
```

The backend will start on `http://localhost:8080`

**Verify the backend is running:**

```bash
curl http://localhost:8080/api/events
```


### 4. Run the Frontend

Navigate to the frontend directory, install dependencies, and start the development server:

```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will be available at `http://localhost:3000`


## API Endpoints

### Events
- `GET /api/events` - Fetch all events with optional filters (genre, city, date range)
- `POST /api/events` - Create a new event (organizer only)
- `GET /api/events/{id}` - Fetch event details
- `PUT /api/events/{id}` - Update event (organizer only)
- `DELETE /api/events/{id}` - Delete event (organizer only)

### Users
- `POST /api/users/signup` - Register a new user
- `POST /api/users/login` - User login
- `GET /api/users/profile` - Get user profile (authenticated)
- `PUT /api/users/profile` - Update user profile (authenticated)

### Tickets
- `GET /api/users/{id}/tickets` - Fetch user tickets
- `POST /api/tickets` - Purchase a ticket
- `DELETE /api/tickets/{id}` - Cancel a ticket


## Building for Production

### Backend

```bash
cd backend
./mvnw clean package
java -jar target/tickethub-0.0.1-SNAPSHOT.jar
```

### Frontend

```bash
cd frontend
npm run build
npm start
```


## Environment Variables

### Backend (`backend/src/main/resources/application.properties`)

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/tickethub
spring.datasource.username=admin
spring.datasource.password=Eva01
```

## Database Schema

The database includes the following main tables:

- **events** - Event information (name, genre, location, pricing)
- **users** - User accounts and authentication
- **organizers** - Event organizers (extends User)
- **artists** - Performing artists
- **tickets** - User ticket purchases
- **event_organizer** - Junction table (many-to-many)
- **event_artist** - Junction table (many-to-many)


## Troubleshooting

### PostgreSQL Container Won't Start

```bash
# Check logs
docker-compose logs postgres

# Restart container
docker-compose restart

# Rebuild and start
docker-compose down
docker-compose up -d --build
```

### Backend Connection Errors

- Ensure PostgreSQL container is running: `docker-compose ps`
- Verify database credentials in `application.properties`
- Check if database and tables exist: `psql -h localhost -U postgres -c "\dt tickethub.*"`

### Frontend Port Already in Use

Change the port in `next.config.ts` or use:

```bash
npm run dev -- -p 3001
```

### CORS Issues

Ensure the backend has CORS configured for the frontend URL in controllers:

```java
@CrossOrigin(origins = "http://localhost:3000")
```


## Contributing

### IMPORTANT: Do not commit directly to the main branch. Please.
1. Locate yourself on the dev branch: `git checkout dev`
2. Make sure you are up-to-date with the changes made by others on dev: `git pull origin dev`
3. Create a feature branch: `git checkout -b dev/your-feature`
4. Move your changes to the stage area: `git add .`
5. Commit your changes: `git commit -m "Add feature"`
6. Push to the branch: `git push origin feature/your-feature`
7. Open a Pull Request


## License

Luego defino la licencia. •ᴗ•