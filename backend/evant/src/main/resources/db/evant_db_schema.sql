-- PostgreSQL Script for Evant Ticket Application Database

-- WARNING: This is a destructive action and will permanently delete all data in these tables.
DROP TABLE IF EXISTS event_artist CASCADE;
DROP TABLE IF EXISTS event_organizer CASCADE;
DROP TABLE IF EXISTS tickets CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS clients CASCADE;
DROP TABLE IF EXISTS organizers CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS artists CASCADE;

-- The tables are created in an order that respects foreign key dependencies.
-- Tables without dependencies (users, artists, events) are created first.

-- =================================================================
-- Table: USERS
-- Stores login and basic account information.
-- =================================================================

-- !! This table will no longer be used. I changed he inheritance strategy. Now Clients and Organizers inherited Users attributes !!

-- CREATE TABLE users (
--     id BIGINT PRIMARY KEY,
--     email VARCHAR(255) UNIQUE NOT NULL,
--     username VARCHAR(100) UNIQUE NOT NULL,
--     password VARCHAR(255) NOT NULL, -- In a real app, this should be a securely hashed password.
--     registration_date DATE DEFAULT CURRENT_DATE NOT NULL
-- );

-- =================================================================
-- Table: ARTISTS
-- Stores information about musical artists or performers.
-- =================================================================
CREATE TABLE artists (
    id BIGINT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    genre VARCHAR(100),
    members TEXT,
    socials JSONB -- Using JSONB is flexible for storing social media links (e.g., {"twitter": "url", "spotify": "url"}).
);

-- =================================================================
-- Table: EVENTS
-- Stores details about each event.
-- =================================================================
CREATE TABLE events (
    id BIGINT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    flyer VARCHAR(255) NOT NULL, -- Stores a URL or path to the flyer image.
    genre VARCHAR(100) NOT NULL,
    subtitle VARCHAR(255),
    description TEXT,
    city VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    start_time DATE NOT NULL
);

-- =================================================================
-- Table: CLIENTS
-- Stores detailed profile information for a user who is a client.
-- This has a one-to-one relationship with the USERS table.
-- =================================================================
CREATE TABLE clients (
    id BIGINT PRIMARY KEY,
    -- user info
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, -- TODO Implement password hashing
    registration_date DATE DEFAULT CURRENT_DATE NOT NULL,
    -- client info
    name VARCHAR(100) NOT NULL,
    --middle_name VARCHAR(100),
    lastname VARCHAR(100) NOT NULL,
    --second_lastname VARCHAR(100),
    gender VARCHAR(50),
    birth_date DATE NOT NULL,
    phone VARCHAR(10)
    --user_id BIGINT UNIQUE NOT NULL,
    --FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- =================================================================
-- Table: ORGANIZERS
-- Stores information for event organizers.
-- This also has a one-to-one relationship with the USERS table.
-- =================================================================
CREATE TABLE organizers (
    id BIGINT PRIMARY KEY,
    -- user info
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, -- TODO Implement password hashing
    registration_date DATE DEFAULT CURRENT_DATE NOT NULL,
    -- organizer info
    name VARCHAR(255) NOT NULL,
    -- contact VARCHAR(255),
    -- representative VARCHAR(255),
    socials JSONB
    --user_id BIGINT UNIQUE NOT NULL,
    --FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- =================================================================
-- Table: ORDERS
-- Stores information about a ticket purchase transaction.
-- =================================================================
CREATE TABLE orders (
    id BIGINT PRIMARY KEY,
    order_date DATE NOT NULL DEFAULT CURRENT_DATE,
    total_amount DECIMAL(10, 2) NOT NULL, -- Suitable for monetary values.
    payment_status VARCHAR(20) NOT NULL,
    client_id BIGINT NOT NULL,
    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE RESTRICT -- Prevent deleting a user with orders.
);

-- =================================================================
-- Table: TICKETS
-- Stores individual tickets linked to an order and an event.
-- =================================================================
CREATE TABLE tickets (
    id BIGINT PRIMARY KEY,
    attendees BIGINT NOT NULL DEFAULT 1,
    qr_code VARCHAR(255), -- Stores a URL or the encoded string for the QR code.
    status VARCHAR(20) NOT NULL, -- e.g., 'active', 'used', 'canceled'. Using a string is more readable.
    order_id BIGINT NOT NULL,
    event_id BIGINT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE RESTRICT
);

-- =================================================================
-- Junction Tables for Many-to-Many Relationships
-- =================================================================

-- Table: EVENT_ORGANIZER
-- Links events to their organizers.
CREATE TABLE event_organizer (
    event_id BIGINT NOT NULL,
    organizer_id BIGINT NOT NULL,
    PRIMARY KEY (event_id, organizer_id), -- Composite primary key ensures a unique pair.
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
    FOREIGN KEY (organizer_id) REFERENCES organizers(id) ON DELETE CASCADE
);

-- Table: EVENT_ARTIST
-- Links events to the artists performing.
CREATE TABLE event_artist (
    event_id BIGINT NOT NULL,
    artist_id BIGINT NOT NULL,
    PRIMARY KEY (event_id, artist_id),
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
    FOREIGN KEY (artist_id) REFERENCES artists(id) ON DELETE CASCADE
);

-- =================================================================
-- View to display all users
-- =================================================================

CREATE VIEW v_all_users AS
SELECT
    id,
    email,
    username,
    password,
    registration_date,
    'client' AS account_type
FROM
    clients
UNION ALL
SELECT
    id,
    email,
    username,
    password,
    registration_date,
    'organizer' AS account_type
FROM
    organizers;

-- End of Script