-- PostgreSQL Script for Inserting Mock Data

-- Clear existing data (optional, useful for clean re-runs)
-- Be careful with this in a real environment!
-- TRUNCATE TABLE users, artists, events, clients, organizer, orders, tickets, event_organizer, event_artist RESTART IDENTITY CASCADE;

-- =================================================================
-- 1. Insert into tables without foreign keys first
-- =================================================================

-- Insert into USERS
-- Passwords should be hashed in a real application (e.g., using bcrypt).
INSERT INTO users (id, email, username, password) VALUES
(1, 'john.doe@email.com', 'johndoe', 'hashed_password_1'),
(2, 'jane.smith@email.com', 'janesmith', 'hashed_password_2'),
(3, 'promo.events@email.com', 'promomusic', 'hashed_password_3'),
(4, 'admin@email.com', 'admin', 'admin');

-- Insert into ARTISTS
INSERT INTO artists (id, name, description, genre, members, socials) VALUES
(1, 'The Crimson Hex', 'A high-energy rock band known for their powerful riffs.', 'Rock', 'Alex (Vocals), Maria (Guitar), Sam (Bass), Leo (Drums)', '{"spotify": "spotify.com/crimsonhex", "instagram": "instagram.com/crimsonhex"}'),
(2, 'Static Rebellion', 'An indie band with a unique blend of folk and electronic sounds.', 'Indie', 'Chloe (Vocals/Synth), Ben (Guitar)', '{"spotify": "spotify.com/staticrebellion"}'),
(3, 'Voltage Valley', 'A classic metal band that delivers thunderous anthems.', 'Metal', 'Vince (Vocals), Jax (Guitar), Spike (Bass), Roxy (Drums)', '{"spotify": "spotify.com/voltagevalley", "instagram": "instagram.com/voltagevalley"}');

-- Insert into EVENTS
INSERT INTO events (id, name, flyer, genre, subtitle, description, city, address, start_time) VALUES
(1, 'Rock Revival Tour', '/flyers/rock_revival.jpg', 'Rock', 'Classic rock anthems that never die.', 'Get ready to headbang! A lineup of legendary bands is here to play all the hits that shaped a generation.', 'Culiacán', 'Foro Tecate, Av. Federalismo', '2025-11-15 20:00:00-07'),
(2, 'Indie Folk Gathering', '/flyers/indie_folk.jpg', 'Indie', 'Heartfelt lyrics and rustic charm.', 'Discover your new favorite indie folk artists in an intimate and cozy setting.', 'Culiacán', 'Teatro Lince, Blvd. Rolando Arjona', '2025-12-05 19:30:00-07');

-- =================================================================
-- 2. Insert into tables with foreign key dependencies
-- These assume the IDs from the previous inserts are 1, 2, 3...
-- =================================================================

-- Insert into CLIENTS (links to users with id 1 and 2)
INSERT INTO clients (id, first_name, first_lastname, gender, birth_date, phone, user_id) VALUES
(1, 'John', 'Doe', 'Male', '1990-05-15', '667-123-4567', 1),
(2, 'Jane', 'Smith', 'Female', '1992-08-22', '667-987-6543', 2);

-- Insert into ORGANIZER (links to user with id 3)
INSERT INTO organizers (id, name, contact, representative, socials, user_id) VALUES
(1, 'PromoMusic Culiacán', 'contact@promomusic.com', 'Ricardo Lopez', '{"website": "promomusic.com"}', 3);

-- =================================================================
-- 3. Insert into junction tables for many-to-many relationships
-- =================================================================

-- Link organizer (id 1) to both events (id 1 and 2)
INSERT INTO event_organizer (event_id, organizer_id) VALUES
(1, 1),
(2, 1);

-- Link artists to events
-- Rock Revival Tour (event id 1) has artists The Crimson Hex (id 1) and Voltage Valley (id 3)
INSERT INTO event_artist (event_id, artist_id) VALUES
(1, 1),
(1, 3);
-- Indie Folk Gathering (event id 2) has artist Static Rebellion (id 2)
INSERT INTO event_artist (event_id, artist_id) VALUES
(2, 2);

-- =================================================================
-- 4. Insert transactional data (orders and tickets)
-- =================================================================

-- Insert into ORDERS (made by clients with user_id 1 and 2)
INSERT INTO orders (id, total_amount, payment_status, user_id) VALUES
(1, 950.00, 'Paid', 1), -- John Doe's order
(2, 400.00, 'Paid', 2); -- Jane Smith's order

-- Insert into TICKETS
-- John Doe's order (id 1) contains 2 tickets for the Rock Revival Tour (event id 1)
INSERT INTO tickets (id, attendees, qr_code, status, order_id, event_id) VALUES
(1, 2, 'qr_code_string_1a2b', 'active', 1, 1);

-- Jane Smith's order (id 2) contains 1 ticket for the Indie Folk Gathering (event id 2)
INSERT INTO tickets (id, attendees, qr_code, status, order_id, event_id) VALUES
(2, 1, 'qr_code_string_3c4d', 'active', 2, 2);


-- End of Script