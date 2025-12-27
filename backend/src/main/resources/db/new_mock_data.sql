-- PostgreSQL Script for Inserting Mock Data
-- Matches 'tickethub_db_schema.sql' with IDENTITY columns and TIMESTAMPTZ

-- =================================================================
-- 1. ARTISTS
-- =================================================================
INSERT INTO artists (name, description, genre, members, socials) VALUES
('The Crimson Hex', 'A high-energy rock band known for their powerful riffs.', 'Rock', 'Alex (Vocals), Maria (Guitar), Sam (Bass), Leo (Drums)', '{"spotify": "spotify.com/crimsonhex", "instagram": "instagram.com/crimsonhex"}'),
('Static Rebellion', 'An indie band with a unique blend of folk and electronic sounds.', 'Indie', 'Chloe (Vocals/Synth), Ben (Guitar)', '{"spotify": "spotify.com/staticrebellion"}'),
('Voltage Valley', 'A classic metal band that delivers thunderous anthems.', 'Metal', 'Vince (Vocals), Jax (Guitar), Spike (Bass), Roxy (Drums)', '{"spotify": "spotify.com/voltagevalley", "instagram": "instagram.com/voltagevalley"}'),
('Luna Sol', 'A rising latin pop star with catchy rhythms.', 'Pop', 'Luna (Vocals)', '{"instagram": "ig.com/lunasol"}'),
('Los Viajeros', 'Romantic ballads for the modern age.', 'Latin Pop', 'Carlos, Miguel, Jose', '{"spotify": "sp.com/viajeros"}'),
('Sofia Dreams', 'Acoustic pop covers and originals.', 'Acoustic', 'Sofia (Guitar/Vocals)', '{"youtube": "yt.com/sofiadreams"}'),
('Ritmo Urbano', 'High energy reggaeton duo.', 'Reggaeton', 'Dany Y, MC Z', '{"tiktok": "tk.com/ritmourbano"}'),
('Banda El Recuerdo', 'Traditional sinaloense banda music.', 'Banda', '15 member ensemble', '{"facebook": "fb.com/bandarecuerdo"}'),
('The Rusty Gears', 'Grunge revivalists from the north.', 'Grunge', 'Tom, Jerry, Mike', '{"bandcamp": "bc.com/rustygears"}'),
('Neon Horizon', 'Synth-wave meets alternative rock.', 'Synth-Rock', 'Sarah (Keys), Dan (Drums)', '{"spotify": "sp.com/neonhorizon"}'),
('Echoes of Mars', 'Space rock with psychedelic visuals.', 'Psychedelic', 'Unknown', '{"instagram": "ig.com/echoes"}'),
('Blackout City', 'Hard rock with a punk attitude.', 'Hard Rock', 'Viper, Rex, Slash', '{"website": "blackout.com"}'),
('Silent Screams', 'Emo-core veterans returning to stage.', 'Emo', 'Jared, Pete, Wentz', '{"twitter": "x.com/silentscreams"}'),
('Jazz Cats Trio', 'Smooth jazz for evening vibes.', 'Jazz', 'Leo (Sax), Ray (Piano)', '{"website": "jazzcats.com"}'),
('Blue Moon Quartet', 'Classic blues standards.', 'Blues', 'Big Mike & The Boys', '{"spotify": "sp.com/bluemoon"}'),
('Sinaloa Symphony', 'Chamber orchestra group.', 'Classical', 'Various', '{"website": "sinaloasymphony.org"}'),
('Sax in the City', 'Solo saxophone performances.', 'Jazz', 'Kenny G (Tribute)', '{"youtube": "yt.com/saxcity"}'),
('DJ K-OS', 'Dubstep and drum & bass producer.', 'Electronic', 'Kevin O.', '{"soundcloud": "sc.com/djk-os"}'),
('Techno Bunker', 'Deep house and minimal techno.', 'Techno', 'Hans, Franz', '{"ra": "ra.co/technobunker"}'),
('Vaporwave Dreams', 'Nostalgic 80s beats.', 'Lo-Fi', 'SadBoy99', '{"bandcamp": "bc.com/vapor"}'),
('Electric Youth', 'Upbeat EDM for festivals.', 'EDM', 'Alice, Bob', '{"instagram": "ig.com/electricyouth"}'),
('Norteño Kings', 'Classic accordion powered norteño.', 'Norteño', 'Los Reyes', '{"facebook": "fb.com/nortenokings"}'),
('Mariachi Oro', 'Golden standard mariachi band.', 'Mariachi', '10 members', '{"website": "mariachioro.com"}'),
('Sierreño Brothers', 'Guitar based regional music.', 'Sierreño', 'Juan, Pedro', '{"tiktok": "tk.com/sierrenobros"}'),
('Folklorico Vivo', 'Traditional dance and music accompaniment.', 'Folk', 'Dance Troupe', '{"culture": "cultura.gob.mx"}'),
('Paper Airplanes', 'Soft indie rock with poetic lyrics.', 'Indie', 'Martha, Stewart', '{"spotify": "sp.com/paperairplanes"}'),
('The Hipsters', 'Irony and banjos.', 'Indie Folk', 'Guy with beard', '{"instagram": "ig.com/thehipsters"}'),
('Garage Days', 'Raw garage rock sound.', 'Garage Rock', 'Teens from the block', '{"bandcamp": "bc.com/garagedays"}'),
('Dream Pop Collective', 'Ethereal vocals and heavy reverb.', 'Dream Pop', 'Liz, Cocteau', '{"youtube": "yt.com/dreampop"}'),
('Iron Fist', 'Heavy metal thunder.', 'Metal', 'Bruce, Steve', '{"website": "ironfist.com"}'),
('Doom Gloom', 'Slow, heavy, and atmospheric.', 'Doom Metal', 'Ozzy (Tribute)', '{"spotify": "sp.com/doomgloom"}'),
('Speed Demons', 'Fast riffs and double bass pedals.', 'Thrash Metal', 'James, Lars', '{"meta": "fb.com/speeddemons"}'),
('Symphonic Souls', 'Metal with operatic vocals.', 'Symphonic Metal', 'Tarja, Marco', '{"website": "symphonicsouls.com"}');

-- =================================================================
-- 2. EVENTS
-- Added generic times (e.g., 20:00:00-07) to match TIMESTAMPTZ
-- =================================================================
INSERT INTO events (name, flyer, genre, subtitle, description, city, address, start_time, price, max_attendees, avaliable_places, status) VALUES
('Rock Revival Tour', 'rock_poster.jpg', 'Rock', 'Classic rock anthems that never die.', 'Get ready to headbang! A lineup of legendary bands is here to play all the hits that shaped a generation.', 'Culiacán', 'Foro Tecate, Av. Federalismo', '2025-11-15 20:00:00-07', 500.00, 2000, 1500, 1),
('Indie Folk Gathering', 'indie_poster.jpg', 'Indie', 'Heartfelt lyrics and rustic charm.', 'Discover your new favorite indie folk artists in an intimate and cozy setting.', 'Culiacán', 'Teatro Lince, Blvd. Rolando Arjona', '2025-12-05 19:30:00-07', 400.00, 800, 600, 1),
('Retro Night 2025', 'electronic_poster.jpg', 'Pop', 'Back to the 80s', 'A night of nostalgia featuring the best hits of the 80s.', 'Culiacán', 'Casino de la Cultura', '2025-10-10 20:00:00-07', 300.00, 500, 0, 2),
('Halloween Metal Bash', 'metal_poster.jpg', 'Metal', 'Spooky heavy riffs', 'The loudest costume party in the city.', 'Culiacán', 'Underground Club', '2025-10-31 21:00:00-07', 450.00, 300, 0, 2),
('Winter Jazz Gala', 'jazz_poster.jpg', 'Jazz', 'Smooth sounds for cold nights', 'An elegant evening with the best jazz trios.', 'Culiacán', 'Teatro MIA', '2025-12-15 19:00:00-07', 800.00, 400, 350, 1),
('Gran Baile de Año Nuevo', 'acoustic_poster.jpg', 'Banda', 'Welcome 2026', 'Celebrate the new year with Banda El Recuerdo.', 'Culiacán', 'Salón 53', '2025-12-31 22:00:00-07', 1500.00, 1000, 800, 1),
('Indie Fest Vol. 4', 'indie_poster.jpg', 'Indie', 'Local talent showcase', 'Support local bands in this all-day festival.', 'Culiacán', 'Parque Las Riberas', '2026-01-15 14:00:00-07', 200.00, 5000, 4500, 1),
('Techno Warehouse', 'electronic_poster.jpg', 'Techno', 'Rave until dawn', 'Underground electronic music experience.', 'Culiacán', 'Secret Location', '2026-01-20 23:00:00-07', 350.00, 200, 50, 1),
('Norteño vs Sierreño', 'acoustic_poster.jpg', 'Regional', 'The ultimate duel', 'Two styles, one stage.', 'Culiacán', 'Palenque', '2026-02-05 20:00:00-07', 600.00, 3000, 2500, 1),
('Valentine Acoustic', 'acoustic_poster.jpg', 'Acoustic', 'Love is in the air', 'Romantic dinner and show.', 'Culiacán', 'Jardín Botánico', '2026-02-14 19:00:00-07', 1200.00, 100, 20, 1),
('Rock in the Park', 'rock_poster.jpg', 'Rock', 'Open air concert', 'Bring your blanket and enjoy the show.', 'Culiacán', 'Isla de Orabá', '2026-03-01 17:00:00-07', 0.00, 10000, 10000, 1),
('Symphony of Spring', 'acoustic_poster.jpg', 'Classical', 'Vivaldi and more', 'The Sinaloa Symphony welcomes spring.', 'Culiacán', 'Teatro Pablo de Villavicencio', '2026-03-21 18:00:00-07', 500.00, 1000, 800, 1),
('Reggaeton Beach Party', 'reggaeton_poster.jpg', 'Reggaeton', 'Sun, sand, and beats', 'Transportation included to Altata.', 'Navolato', 'Altata Beach Club', '2026-04-05 12:00:00-07', 700.00, 1500, 1000, 1),
('Metal Mayhem', 'metal_poster.jpg', 'Metal', 'Moshpit guaranteed', 'Five bands, one night of destruction.', 'Culiacán', 'Estadio Universitario', '2026-04-20 18:00:00-07', 400.00, 5000, 4000, 1),
('Synthwave Sunset', 'electronic_poster.jpg', 'Synth-Rock', 'Neon lights and vibes', 'A visual and auditory experience.', 'Culiacán', 'Roof Top Bar', '2026-05-10 19:00:00-07', 300.00, 150, 100, 1),
('Blues & BBQ', 'jazz_poster.jpg', 'Blues', 'Good food, sad songs', 'All you can eat BBQ with live blues.', 'Culiacán', 'Ranch House', '2026-05-25 13:00:00-07', 900.00, 200, 150, 1),
('Pop Icons Tribute', 'indie_poster.jpg', 'Pop', 'Sing along', 'Tribute bands playing top 40 hits.', 'Culiacán', 'La 20', '2026-06-05 21:00:00-07', 250.00, 300, 200, 1),
('Electronic Forest', 'electronic_poster.jpg', 'EDM', 'Dance in nature', 'Camping and music festival.', 'Imala', 'Imala Resort', '2026-06-20 10:00:00-07', 1800.00, 2000, 1800, 1),
('Mariachi Gala', 'acoustic_poster.jpg', 'Mariachi', 'Mexican Pride', 'A celebration of our traditions.', 'Culiacán', 'Plazuela Rosales', '2026-07-01 18:00:00-07', 0.00, 5000, 5000, 1),
('Grunge Garage', 'rock_poster.jpg', 'Grunge', 'Flannel shirts welcome', 'Raw energy and loud amps.', 'Culiacán', 'Backyard Venue', '2026-07-15 20:00:00-07', 150.00, 100, 20, 1),
('Summer Vibes', 'indie_poster.jpg', 'Pop', 'Pool party', 'DJ sets and live pop acts.', 'Culiacán', 'Hotel Lucerna Pool', '2026-07-30 14:00:00-07', 600.00, 300, 250, 1),
('The Grand Finale', 'rock_poster.jpg', 'Rock', 'End of season', 'A massive concert to end the season.', 'Culiacán', 'Estadio Tomateros', '2026-08-15 20:00:00-07', 2000.00, 15000, 12000, 1);

-- =================================================================
-- 3. CLIENTS
-- Registration date is handled by the DB trigger
-- =================================================================
INSERT INTO clients (email, username, password, name, lastname, gender, birth_date, phone) VALUES
('john.doe@email.com', 'johndoe', 'hashed_password_1', 'John', 'Doe', 'Male', '1990-05-15', '6671234567'),
('jane.smith@email.com', 'janesmith', 'hashed_password_2', 'Jane', 'Smith', 'Female', '1992-08-22', '6679876543'),
('admin@email.com', 'admin', 'admin', 'Erick', 'Hermosillo', 'Male', '2004-05-02', '6671932888'),
('mike.ross@email.com', 'mikeross', 'hash_4', 'Mike', 'Ross', 'Male', '1995-02-10', '6670000001'),
('rachel.green@email.com', 'rachelgreen', 'hash_5', 'Rachel', 'Green', 'Female', '1998-05-05', '6670000002'),
('joey.t@email.com', 'joeyt', 'hash_6', 'Joey', 'Tribbiani', 'Male', '1993-01-12', '6670000003'),
('monica.g@email.com', 'monicag', 'hash_7', 'Monica', 'Geller', 'Female', '1994-09-22', '6670000004'),
('chandler.b@email.com', 'chandlerb', 'hash_8', 'Chandler', 'Bing', 'Male', '1992-04-15', '6670000005'),
('phoebe.b@email.com', 'phoebeb', 'hash_9', 'Phoebe', 'Buffay', 'Female', '1991-07-30', '6670000006'),
('tony.stark@email.com', 'ironman', 'hash_10', 'Tony', 'Stark', 'Male', '1980-05-29', '6670000007'),
('steve.rogers@email.com', 'cap', 'hash_11', 'Steve', 'Rogers', 'Male', '1940-07-04', '6670000008'),
('natasha.r@email.com', 'widow', 'hash_12', 'Natasha', 'Romanoff', 'Female', '1984-11-22', '6670000009'),
('bruce.banner@email.com', 'hulk', 'hash_13', 'Bruce', 'Banner', 'Male', '1975-12-18', '6670000010'),
('clint.barton@email.com', 'hawkeye', 'hash_14', 'Clint', 'Barton', 'Male', '1982-01-07', '6670000011'),
('thor.odinson@email.com', 'thor', 'hash_15', 'Thor', 'Odinson', 'Male', '1500-01-01', '6670000012'),
('peter.parker@email.com', 'spidey', 'hash_16', 'Peter', 'Parker', 'Male', '2001-08-10', '6670000013'),
('wanda.m@email.com', 'scarlet', 'hash_17', 'Wanda', 'Maximoff', 'Female', '1999-03-01', '6670000014'),
('vision.jarvis@email.com', 'vision', 'hash_18', 'Vision', 'Android', 'NB', '2015-05-01', '6670000015'),
('strange.s@email.com', 'doctor', 'hash_19', 'Stephen', 'Strange', 'Male', '1985-11-11', '6670000016'),
('carol.danvers@email.com', 'marvel', 'hash_20', 'Carol', 'Danvers', 'Female', '1988-04-15', '6670000017'),
('tcb@email.com', 'panther', 'hash_21', 'T', 'Challa', 'Male', '1985-08-20', '6670000018'),
('scott.lang@email.com', 'antman', 'hash_22', 'Scott', 'Lang', 'Male', '1981-06-06', '6670000019'),
('hope.v@email.com', 'wasp', 'hash_23', 'Hope', 'Van Dyne', 'Female', '1983-02-14', '6670000020'),
('loki.l@email.com', 'loki', 'hash_24', 'Loki', 'Laufeyson', 'Male', '1400-12-12', '6670000021'),
('gamora.z@email.com', 'gamora', 'hash_25', 'Gamora', 'Zen', 'Female', '1990-01-01', '6670000022'),
('nebula.z@email.com', 'nebula', 'hash_26', 'Nebula', 'Zen', 'Female', '1991-01-01', '6670000023'),
('rocket.r@email.com', 'rocket', 'hash_27', 'Rocket', 'Raccoon', 'Male', '2010-05-05', '6670000024'),
('groot.t@email.com', 'groot', 'hash_28', 'I am', 'Groot', 'NB', '2014-08-01', '6670000025');

-- =================================================================
-- 4. ORGANIZERS
-- =================================================================
INSERT INTO organizers (email, username, password, name, socials) VALUES
('promo.events@email.com', 'promomusic', 'hashed_password_3', 'PromoMusic Culiacán', '{"website": "promomusic.com"}'),
('fest.master@email.com', 'festmaster', 'hashed_pass_4', 'FestMaster Global', '{"website": "festmaster.com", "facebook": "fb.com/festmaster"}'),
('culiacan.arts@email.com', 'clnarts', 'hashed_pass_5', 'Culiacán Arts Council', '{"instagram": "ig.com/clnarts"}'),
('indie.vibes@email.com', 'indievibes', 'hashed_pass_6', 'Indie Vibes Promotions', '{"twitter": "x.com/indievibes"}'),
('mega.shows@email.com', 'megashows', 'hashed_pass_7', 'Mega Shows MX', '{"website": "megashows.mx"}'),
('underground.beat@email.com', 'underbeat', 'hashed_pass_8', 'The Underground Beat', '{"tiktok": "tiktok.com/@underbeat"}');

-- =================================================================
-- 5. JUNCTION TABLES
-- =================================================================

-- Event -> Organizer
INSERT INTO event_organizer (event_id, organizer_id) VALUES
(1, 1), (2, 1),
(3, 2), (4, 6), (5, 3), (6, 5), (7, 4), (8, 6), (9, 5),
(10, 3), (11, 2), (12, 3), (13, 2), (14, 6),
(15, 4), (16, 5), (17, 2), (18, 6), (19, 3),
(20, 6), (21, 2), (22, 5);

-- Event -> Artists
INSERT INTO event_artist (event_id, artist_id) VALUES
(1, 1), (1, 3), (2, 2),
(3, 4), (3, 6),
(4, 30), (4, 31),
(5, 14), (5, 17),
(6, 8),
(7, 26), (7, 27), (7, 28),
(8, 19), (8, 21),
(9, 22), (9, 24),
(10, 5), (10, 6),
(11, 9), (11, 12),
(12, 16),
(13, 7), (13, 4),
(14, 32), (14, 33), (14, 12),
(15, 10), (15, 20),
(16, 15),
(17, 6),
(18, 18), (18, 21), (18, 19),
(19, 23),
(20, 9), (20, 28),
(21, 4), (21, 7),
(22, 12), (22, 30), (22, 1);

-- =================================================================
-- 6. ORDERS
-- Added generic times to order_date to match TIMESTAMPTZ
-- =================================================================
INSERT INTO orders (total_amount, payment_status, client_id, order_date) VALUES
(1000.00, 1, 1, '2025-11-01 10:00:00-07'),
(400.00, 1, 2, '2025-11-05 14:30:00-07'),
(1500.00, 1, 3, '2025-11-10 09:15:00-07'),
(1200.00, 1, 3, '2025-11-12 18:00:00-07'),
(600.00, 1, 4, '2025-10-01 12:00:00-07'),
(900.00, 1, 5, '2025-10-25 15:45:00-07'),
(800.00, 1, 6, '2025-12-01 11:20:00-07'),
(3000.00, 1, 7, '2025-12-25 20:00:00-07'),
(400.00, 1, 8, '2026-01-05 13:10:00-07'),
(700.00, 1, 9, '2026-01-10 16:50:00-07'),
(2400.00, 1, 10, '2026-02-01 08:30:00-07'),
(2400.00, 1, 11, '2026-02-10 19:40:00-07'),
(0.00, 1, 12, '2026-02-28 10:00:00-07'),
(1500.00, 1, 13, '2026-03-15 14:00:00-07'),
(1400.00, 1, 14, '2026-03-30 09:00:00-07'),
(1600.00, 1, 15, '2026-04-10 17:30:00-07'),
(900.00, 1, 16, '2026-05-01 12:15:00-07'),
(1800.00, 1, 17, '2026-05-15 15:00:00-07'),
(500.00, 1, 18, '2026-06-01 11:45:00-07'),
(3600.00, 1, 19, '2026-06-10 18:20:00-07'),
(0.00, 1, 20, '2026-06-25 13:00:00-07'),
(600.00, 1, 21, '2026-07-05 09:30:00-07'),
(1200.00, 1, 22, '2026-07-20 16:10:00-07'),
(4000.00, 1, 23, '2026-08-01 14:40:00-07');

-- =================================================================
-- 7. TICKETS
-- =================================================================
INSERT INTO tickets (qr_code, status, purchase_price, attendees, order_id, event_id) VALUES
('qr_code_string_order1', 1, 500.00, 2, 1, 1),
('qr_code_string_order2', 1, 400.00, 1, 2, 2),
('qr_code_string_order3', 1, 500.00, 3, 3, 1),
('qr_code_string_order4', 1, 400.00, 3, 4, 2),
('qr_ord5', 0, 300.00, 2, 5, 3),
('qr_ord6', 0, 450.00, 2, 6, 4),
('qr_ord7', 1, 800.00, 1, 7, 5),
('qr_ord8', 1, 1500.00, 2, 8, 6),
('qr_ord9', 1, 200.00, 2, 9, 7),
('qr_ord10', 1, 350.00, 2, 10, 8),
('qr_ord11', 1, 600.00, 4, 11, 9),
('qr_ord12', 1, 1200.00, 2, 12, 10),
('qr_ord13', 1, 0.00, 1, 13, 11),
('qr_ord14', 1, 500.00, 3, 14, 12),
('qr_ord15', 1, 700.00, 2, 15, 13),
('qr_ord16', 1, 400.00, 4, 16, 14),
('qr_ord17', 1, 300.00, 3, 17, 15),
('qr_ord18', 1, 900.00, 2, 18, 16),
('qr_ord19', 1, 250.00, 2, 19, 17),
('qr_ord20', 1, 1800.00, 2, 20, 18),
('qr_ord21', 1, 0.00, 2, 21, 19),
('qr_ord22', 1, 150.00, 4, 22, 20),
('qr_ord23', 1, 600.00, 2, 23, 21),
('qr_ord24', 1, 2000.00, 2, 24, 22);

-- End of Script