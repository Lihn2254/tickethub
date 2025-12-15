-- =================================================================
-- 5. Insert Additional ORGANIZERS (IDs 2-6)
-- =================================================================
INSERT INTO organizers (id, email, username, password, name, socials) VALUES
(2, 'fest.master@email.com', 'festmaster', 'hashed_pass_4', 'FestMaster Global', '{"website": "festmaster.com", "facebook": "fb.com/festmaster"}'),
(3, 'culiacan.arts@email.com', 'clnarts', 'hashed_pass_5', 'Culiacán Arts Council', '{"instagram": "ig.com/clnarts"}'),
(4, 'indie.vibes@email.com', 'indievibes', 'hashed_pass_6', 'Indie Vibes Promotions', '{"twitter": "x.com/indievibes"}'),
(5, 'mega.shows@email.com', 'megashows', 'hashed_pass_7', 'Mega Shows MX', '{"website": "megashows.mx"}'),
(6, 'underground.beat@email.com', 'underbeat', 'hashed_pass_8', 'The Underground Beat', '{"tiktok": "tiktok.com/@underbeat"}');

-- =================================================================
-- 6. Insert Additional ARTISTS (IDs 4-33)
-- =================================================================
INSERT INTO artists (id, name, description, genre, members, socials) VALUES
-- Pop / Latin
(4, 'Luna Sol', 'A rising latin pop star with catchy rhythms.', 'Pop', 'Luna (Vocals)', '{"instagram": "ig.com/lunasol"}'),
(5, 'Los Viajeros', 'Romantic ballads for the modern age.', 'Latin Pop', 'Carlos, Miguel, Jose', '{"spotify": "sp.com/viajeros"}'),
(6, 'Sofia Dreams', 'Acoustic pop covers and originals.', 'Acoustic', 'Sofia (Guitar/Vocals)', '{"youtube": "yt.com/sofiadreams"}'),
(7, 'Ritmo Urbano', 'High energy reggaeton duo.', 'Reggaeton', 'Dany Y, MC Z', '{"tiktok": "tk.com/ritmourbano"}'),
(8, 'Banda El Recuerdo', 'Traditional sinaloense banda music.', 'Banda', '15 member ensemble', '{"facebook": "fb.com/bandarecuerdo"}'),
-- Rock / Alternative
(9, 'The Rusty Gears', 'Grunge revivalists from the north.', 'Grunge', 'Tom, Jerry, Mike', '{"bandcamp": "bc.com/rustygears"}'),
(10, 'Neon Horizon', 'Synth-wave meets alternative rock.', 'Synth-Rock', 'Sarah (Keys), Dan (Drums)', '{"spotify": "sp.com/neonhorizon"}'),
(11, 'Echoes of Mars', 'Space rock with psychedelic visuals.', 'Psychedelic', 'Unknown', '{"instagram": "ig.com/echoes"}'),
(12, 'Blackout City', 'Hard rock with a punk attitude.', 'Hard Rock', 'Viper, Rex, Slash', '{"website": "blackout.com"}'),
(13, 'Silent Screams', 'Emo-core veterans returning to stage.', 'Emo', 'Jared, Pete, Wentz', '{"twitter": "x.com/silentscreams"}'),
-- Jazz / Blues / Classical
(14, 'Jazz Cats Trio', 'Smooth jazz for evening vibes.', 'Jazz', 'Leo (Sax), Ray (Piano)', '{"website": "jazzcats.com"}'),
(15, 'Blue Moon Quartet', 'Classic blues standards.', 'Blues', 'Big Mike & The Boys', '{"spotify": "sp.com/bluemoon"}'),
(16, 'Sinaloa Symphony', 'Chamber orchestra group.', 'Classical', 'Various', '{"website": "sinaloasymphony.org"}'),
(17, 'Sax in the City', 'Solo saxophone performances.', 'Jazz', 'Kenny G (Tribute)', '{"youtube": "yt.com/saxcity"}'),
-- Electronic / DJ
(18, 'DJ K-OS', 'Dubstep and drum & bass producer.', 'Electronic', 'Kevin O.', '{"soundcloud": "sc.com/djk-os"}'),
(19, 'Techno Bunker', 'Deep house and minimal techno.', 'Techno', 'Hans, Franz', '{"ra": "ra.co/technobunker"}'),
(20, 'Vaporwave Dreams', 'Nostalgic 80s beats.', 'Lo-Fi', 'SadBoy99', '{"bandcamp": "bc.com/vapor"}'),
(21, 'Electric Youth', 'Upbeat EDM for festivals.', 'EDM', 'Alice, Bob', '{"instagram": "ig.com/electricyouth"}'),
-- Regional / Folk
(22, 'Norteño Kings', 'Classic accordion powered norteño.', 'Norteño', 'Los Reyes', '{"facebook": "fb.com/nortenokings"}'),
(23, 'Mariachi Oro', 'Golden standard mariachi band.', 'Mariachi', '10 members', '{"website": "mariachioro.com"}'),
(24, 'Sierreño Brothers', 'Guitar based regional music.', 'Sierreño', 'Juan, Pedro', '{"tiktok": "tk.com/sierrenobros"}'),
(25, 'Folklorico Vivo', 'Traditional dance and music accompaniment.', 'Folk', 'Dance Troupe', '{"culture": "cultura.gob.mx"}'),
-- Indie / Alternative
(26, 'Paper Airplanes', 'Soft indie rock with poetic lyrics.', 'Indie', 'Martha, Stewart', '{"spotify": "sp.com/paperairplanes"}'),
(27, 'The Hipsters', 'Irony and banjos.', 'Indie Folk', 'Guy with beard', '{"instagram": "ig.com/thehipsters"}'),
(28, 'Garage Days', 'Raw garage rock sound.', 'Garage Rock', 'Teens from the block', '{"bandcamp": "bc.com/garagedays"}'),
(29, 'Dream Pop Collective', 'Ethereal vocals and heavy reverb.', 'Dream Pop', 'Liz, Cocteau', '{"youtube": "yt.com/dreampop"}'),
-- Metal
(30, 'Iron Fist', 'Heavy metal thunder.', 'Metal', 'Bruce, Steve', '{"website": "ironfist.com"}'),
(31, 'Doom Gloom', 'Slow, heavy, and atmospheric.', 'Doom Metal', 'Ozzy (Tribute)', '{"spotify": "sp.com/doomgloom"}'),
(32, 'Speed Demons', 'Fast riffs and double bass pedals.', 'Thrash Metal', 'James, Lars', '{"meta": "fb.com/speeddemons"}'),
(33, 'Symphonic Souls', 'Metal with operatic vocals.', 'Symphonic Metal', 'Tarja, Marco', '{"website": "symphonicsouls.com"}');

-- =================================================================
-- 7. Insert Additional EVENTS (IDs 3-22)
-- =================================================================
INSERT INTO events (id, name, flyer, genre, subtitle, description, city, address, start_time, price) VALUES
-- Past Events (2)
(3, 'Retro Night 2025', '/flyers/retro_night.jpg', 'Pop', 'Back to the 80s', 'A night of nostalgia featuring the best hits of the 80s.', 'Culiacán', 'Casino de la Cultura', '2025-10-10 20:00:00-07', 300.00),
(4, 'Halloween Metal Bash', '/flyers/halloween_bash.jpg', 'Metal', 'Spooky heavy riffs', 'The loudest costume party in the city.', 'Culiacán', 'Underground Club', '2025-10-31 21:00:00-07', 450.00),

-- Future Events (18)
(5, 'Winter Jazz Gala', '/flyers/winter_jazz.jpg', 'Jazz', 'Smooth sounds for cold nights', 'An elegant evening with the best jazz trios.', 'Culiacán', 'Teatro MIA', '2025-12-15 19:00:00-07', 800.00),
(6, 'Gran Baile de Año Nuevo', '/flyers/new_year.jpg', 'Banda', 'Welcome 2026', 'Celebrate the new year with Banda El Recuerdo.', 'Culiacán', 'Salón 53', '2025-12-31 22:00:00-07', 1500.00),
(7, 'Indie Fest Vol. 4', '/flyers/indie_fest.jpg', 'Indie', 'Local talent showcase', 'Support local bands in this all-day festival.', 'Culiacán', 'Parque Las Riberas', '2026-01-15 14:00:00-07', 200.00),
(8, 'Techno Warehouse', '/flyers/techno.jpg', 'Techno', 'Rave until dawn', 'Underground electronic music experience.', 'Culiacán', 'Secret Location', '2026-01-20 23:00:00-07', 350.00),
(9, 'Norteño vs Sierreño', '/flyers/duel.jpg', 'Regional', 'The ultimate duel', 'Two styles, one stage.', 'Culiacán', 'Palenque', '2026-02-05 20:00:00-07', 600.00),
(10, 'Valentine Acoustic', '/flyers/valentine.jpg', 'Acoustic', 'Love is in the air', 'Romantic dinner and show.', 'Culiacán', 'Jardín Botánico', '2026-02-14 19:00:00-07', 1200.00),
(11, 'Rock in the Park', '/flyers/rock_park.jpg', 'Rock', 'Open air concert', 'Bring your blanket and enjoy the show.', 'Culiacán', 'Isla de Orabá', '2026-03-01 17:00:00-07', 0.00),
(12, 'Symphony of Spring', '/flyers/spring.jpg', 'Classical', 'Vivaldi and more', 'The Sinaloa Symphony welcomes spring.', 'Culiacán', 'Teatro Pablo de Villavicencio', '2026-03-21 18:00:00-07', 500.00),
(13, 'Reggaeton Beach Party', '/flyers/beach.jpg', 'Reggaeton', 'Sun, sand, and beats', 'Transportation included to Altata.', 'Navolato', 'Altata Beach Club', '2026-04-05 12:00:00-07', 700.00),
(14, 'Metal Mayhem', '/flyers/mayhem.jpg', 'Metal', 'Moshpit guaranteed', 'Five bands, one night of destruction.', 'Culiacán', 'Estadio Universitario', '2026-04-20 18:00:00-07', 400.00),
(15, 'Synthwave Sunset', '/flyers/synth.jpg', 'Synth-Rock', 'Neon lights and vibes', 'A visual and auditory experience.', 'Culiacán', 'Roof Top Bar', '2026-05-10 19:00:00-07', 300.00),
(16, 'Blues & BBQ', '/flyers/blues.jpg', 'Blues', 'Good food, sad songs', 'All you can eat BBQ with live blues.', 'Culiacán', 'Ranch House', '2026-05-25 13:00:00-07', 900.00),
(17, 'Pop Icons Tribute', '/flyers/pop.jpg', 'Pop', 'Sing along', 'Tribute bands playing top 40 hits.', 'Culiacán', 'La 20', '2026-06-05 21:00:00-07', 250.00),
(18, 'Electronic Forest', '/flyers/forest.jpg', 'EDM', 'Dance in nature', 'Camping and music festival.', 'Imala', 'Imala Resort', '2026-06-20 10:00:00-07', 1800.00),
(19, 'Mariachi Gala', '/flyers/mariachi.jpg', 'Mariachi', 'Mexican Pride', 'A celebration of our traditions.', 'Culiacán', 'Plazuela Rosales', '2026-07-01 18:00:00-07', 0.00),
(20, 'Grunge Garage', '/flyers/grunge.jpg', 'Grunge', 'Flannel shirts welcome', 'Raw energy and loud amps.', 'Culiacán', 'Backyard Venue', '2026-07-15 20:00:00-07', 150.00),
(21, 'Summer Vibes', '/flyers/summer.jpg', 'Pop', 'Pool party', 'DJ sets and live pop acts.', 'Culiacán', 'Hotel Lucerna Pool', '2026-07-30 14:00:00-07', 600.00),
(22, 'The Grand Finale', '/flyers/finale.jpg', 'Rock', 'End of season', 'A massive concert to end the season.', 'Culiacán', 'Estadio Tomateros', '2026-08-15 20:00:00-07', 2000.00);

-- =================================================================
-- 8. Insert Additional CLIENTS (IDs 4-28)
-- =================================================================
INSERT INTO clients (id, email, username, password, name, lastname, gender, birth_date, phone) VALUES
(4, 'mike.ross@email.com', 'mikeross', 'hash_4', 'Mike', 'Ross', 'Male', '1995-02-10', '6670000001'),
(5, 'rachel.green@email.com', 'rachelgreen', 'hash_5', 'Rachel', 'Green', 'Female', '1998-05-05', '6670000002'),
(6, 'joey.t@email.com', 'joeyt', 'hash_6', 'Joey', 'Tribbiani', 'Male', '1993-01-12', '6670000003'),
(7, 'monica.g@email.com', 'monicag', 'hash_7', 'Monica', 'Geller', 'Female', '1994-09-22', '6670000004'),
(8, 'chandler.b@email.com', 'chandlerb', 'hash_8', 'Chandler', 'Bing', 'Male', '1992-04-15', '6670000005'),
(9, 'phoebe.b@email.com', 'phoebeb', 'hash_9', 'Phoebe', 'Buffay', 'Female', '1991-07-30', '6670000006'),
(10, 'tony.stark@email.com', 'ironman', 'hash_10', 'Tony', 'Stark', 'Male', '1980-05-29', '6670000007'),
(11, 'steve.rogers@email.com', 'cap', 'hash_11', 'Steve', 'Rogers', 'Male', '1940-07-04', '6670000008'),
(12, 'natasha.r@email.com', 'widow', 'hash_12', 'Natasha', 'Romanoff', 'Female', '1984-11-22', '6670000009'),
(13, 'bruce.banner@email.com', 'hulk', 'hash_13', 'Bruce', 'Banner', 'Male', '1975-12-18', '6670000010'),
(14, 'clint.barton@email.com', 'hawkeye', 'hash_14', 'Clint', 'Barton', 'Male', '1982-01-07', '6670000011'),
(15, 'thor.odinson@email.com', 'thor', 'hash_15', 'Thor', 'Odinson', 'Male', '1500-01-01', '6670000012'),
(16, 'peter.parker@email.com', 'spidey', 'hash_16', 'Peter', 'Parker', 'Male', '2001-08-10', '6670000013'),
(17, 'wanda.m@email.com', 'scarlet', 'hash_17', 'Wanda', 'Maximoff', 'Female', '1999-03-01', '6670000014'),
(18, 'vision.jarvis@email.com', 'vision', 'hash_18', 'Vision', 'Android', 'NB', '2015-05-01', '6670000015'),
(19, 'strange.s@email.com', 'doctor', 'hash_19', 'Stephen', 'Strange', 'Male', '1985-11-11', '6670000016'),
(20, 'carol.danvers@email.com', 'marvel', 'hash_20', 'Carol', 'Danvers', 'Female', '1988-04-15', '6670000017'),
(21, 'tcb@email.com', 'panther', 'hash_21', 'T', 'Challa', 'Male', '1985-08-20', '6670000018'),
(22, 'scott.lang@email.com', 'antman', 'hash_22', 'Scott', 'Lang', 'Male', '1981-06-06', '6670000019'),
(23, 'hope.v@email.com', 'wasp', 'hash_23', 'Hope', 'Van Dyne', 'Female', '1983-02-14', '6670000020'),
(24, 'loki.l@email.com', 'loki', 'hash_24', 'Loki', 'Laufeyson', 'Male', '1400-12-12', '6670000021'),
(25, 'gamora.z@email.com', 'gamora', 'hash_25', 'Gamora', 'Zen', 'Female', '1990-01-01', '6670000022'),
(26, 'nebula.z@email.com', 'nebula', 'hash_26', 'Nebula', 'Zen', 'Female', '1991-01-01', '6670000023'),
(27, 'rocket.r@email.com', 'rocket', 'hash_27', 'Rocket', 'Raccoon', 'Male', '2010-05-05', '6670000024'),
(28, 'groot.t@email.com', 'groot', 'hash_28', 'I am', 'Groot', 'NB', '2014-08-01', '6670000025');

-- =================================================================
-- 9. Link Events to Organizers (Many-to-Many)
-- =================================================================
INSERT INTO event_organizer (event_id, organizer_id) VALUES
(3, 2), (4, 6), -- Past events
(5, 3), (6, 5), (7, 4), (8, 6), (9, 5),
(10, 3), (11, 2), (12, 3), (13, 2), (14, 6),
(15, 4), (16, 5), (17, 2), (18, 6), (19, 3),
(20, 6), (21, 2), (22, 5);

-- =================================================================
-- 10. Link Artists to Events (Many-to-Many)
-- =================================================================
INSERT INTO event_artist (event_id, artist_id) VALUES
(3, 4), (3, 6), -- Retro night (Pop)
(4, 30), (4, 31), -- Halloween (Metal)
(5, 14), (5, 17), -- Jazz Gala
(6, 8), -- Banda
(7, 26), (7, 27), (7, 28), -- Indie Fest
(8, 19), (8, 21), -- Techno
(9, 22), (9, 24), -- Norteño vs Sierreño
(10, 5), (10, 6), -- Valentine
(11, 9), (11, 12), -- Rock Park
(12, 16), -- Symphony
(13, 7), (13, 4), -- Reggaeton
(14, 32), (14, 33), (14, 12), -- Metal Mayhem
(15, 10), (15, 20), -- Synthwave
(16, 15), -- Blues
(17, 6), -- Pop Tribute
(18, 18), (18, 21), (18, 19), -- Electronic Forest
(19, 23), -- Mariachi
(20, 9), (20, 28), -- Grunge
(21, 4), (21, 7), -- Summer Vibes
(22, 12), (22, 30), (22, 1); -- Grand Finale

-- =================================================================
-- 11. Insert ORDERS (IDs 5-24)
-- =================================================================
INSERT INTO orders (id, total_amount, payment_status, client_id) VALUES
(5, 600.00, 'Paid', 4),   -- Mike bought 2 Retro Night tix
(6, 900.00, 'Paid', 5),   -- Rachel bought 2 Halloween tix
(7, 800.00, 'Paid', 6),   -- Joey bought 1 Jazz tix
(8, 3000.00, 'Paid', 7),  -- Monica bought 2 New Year tix
(9, 400.00, 'Paid', 8),   -- Chandler bought 2 Indie Fest tix
(10, 700.00, 'Paid', 9),  -- Phoebe bought 2 Techno tix
(11, 2400.00, 'Paid', 10), -- Tony bought 4 Norteño tix (Company expense)
(12, 2400.00, 'Paid', 11), -- Steve bought 2 Valentine tix
(13, 0.00, 'Paid', 12),    -- Natasha got Free Rock Park tix (system record)
(14, 1500.00, 'Paid', 13), -- Bruce bought 3 Symphony tix
(15, 1400.00, 'Paid', 14), -- Clint bought 2 Reggaeton tix
(16, 1600.00, 'Paid', 15), -- Thor bought 4 Metal Mayhem tix
(17, 900.00, 'Paid', 16),  -- Peter bought 3 Synthwave tix
(18, 1800.00, 'Paid', 17), -- Wanda bought 2 Blues tix
(19, 500.00, 'Paid', 18),  -- Vision bought 2 Pop Tribute tix
(20, 3600.00, 'Paid', 19), -- Strange bought 2 Electronic Forest tix
(21, 0.00, 'Paid', 20),    -- Carol bought 2 Mariachi tix (Free event)
(22, 600.00, 'Paid', 21),  -- TChalla bought 4 Grunge tix
(23, 1200.00, 'Paid', 22), -- Scott bought 2 Summer Vibes tix
(24, 4000.00, 'Paid', 23); -- Hope bought 2 Grand Finale tix

-- =================================================================
-- 12. Insert TICKETS (IDs 9+)
-- =================================================================
INSERT INTO tickets (id, qr_code, status, purchase_price, order_id, event_id) VALUES
-- Order 5 (Event 3 - Retro Night - 300.00)
(9, 'qr_ord5_1', 'scanned', 300.00, 5, 3),
(10, 'qr_ord5_2', 'scanned', 300.00, 5, 3),
-- Order 6 (Event 4 - Halloween - 450.00)
(11, 'qr_ord6_1', 'scanned', 450.00, 6, 4),
(12, 'qr_ord6_2', 'scanned', 450.00, 6, 4),
-- Order 7 (Event 5 - Jazz - 800.00)
(13, 'qr_ord7_1', 'active', 800.00, 7, 5),
-- Order 8 (Event 6 - New Year - 1500.00)
(14, 'qr_ord8_1', 'active', 1500.00, 8, 6),
(15, 'qr_ord8_2', 'active', 1500.00, 8, 6),
-- Order 9 (Event 7 - Indie - 200.00)
(16, 'qr_ord9_1', 'active', 200.00, 9, 7),
(17, 'qr_ord9_2', 'active', 200.00, 9, 7),
-- Order 10 (Event 8 - Techno - 350.00)
(18, 'qr_ord10_1', 'active', 350.00, 10, 8),
(19, 'qr_ord10_2', 'active', 350.00, 10, 8),
-- Order 11 (Event 9 - Norteño - 600.00)
(20, 'qr_ord11_1', 'active', 600.00, 11, 9),
(21, 'qr_ord11_2', 'active', 600.00, 11, 9),
(22, 'qr_ord11_3', 'active', 600.00, 11, 9),
(23, 'qr_ord11_4', 'active', 600.00, 11, 9),
-- Order 12 (Event 10 - Valentine - 1200.00)
(24, 'qr_ord12_1', 'active', 1200.00, 12, 10),
(25, 'qr_ord12_2', 'active', 1200.00, 12, 10),
-- Order 13 (Event 11 - Rock Park - 0.00)
(26, 'qr_ord13_1', 'active', 0.00, 13, 11),
-- Order 14 (Event 12 - Symphony - 500.00)
(27, 'qr_ord14_1', 'active', 500.00, 14, 12),
(28, 'qr_ord14_2', 'active', 500.00, 14, 12),
(29, 'qr_ord14_3', 'active', 500.00, 14, 12),
-- Order 15 (Event 13 - Reggaeton - 700.00)
(30, 'qr_ord15_1', 'active', 700.00, 15, 13),
(31, 'qr_ord15_2', 'active', 700.00, 15, 13),
-- Order 16 (Event 14 - Metal - 400.00)
(32, 'qr_ord16_1', 'active', 400.00, 16, 14),
(33, 'qr_ord16_2', 'active', 400.00, 16, 14),
(34, 'qr_ord16_3', 'active', 400.00, 16, 14),
(35, 'qr_ord16_4', 'active', 400.00, 16, 14),
-- Order 17 (Event 15 - Synth - 300.00)
(36, 'qr_ord17_1', 'active', 300.00, 17, 15),
(37, 'qr_ord17_2', 'active', 300.00, 17, 15),
(38, 'qr_ord17_3', 'active', 300.00, 17, 15),
-- Order 18 (Event 16 - Blues - 900.00)
(39, 'qr_ord18_1', 'active', 900.00, 18, 16),
(40, 'qr_ord18_2', 'active', 900.00, 18, 16),
-- Order 19 (Event 17 - Pop - 250.00)
(41, 'qr_ord19_1', 'active', 250.00, 19, 17),
(42, 'qr_ord19_2', 'active', 250.00, 19, 17),
-- Order 20 (Event 18 - Forest - 1800.00)
(43, 'qr_ord20_1', 'active', 1800.00, 20, 18),
(44, 'qr_ord20_2', 'active', 1800.00, 20, 18),
-- Order 21 (Event 19 - Mariachi - 0.00)
(45, 'qr_ord21_1', 'active', 0.00, 21, 19),
(46, 'qr_ord21_2', 'active', 0.00, 21, 19),
-- Order 22 (Event 20 - Grunge - 150.00)
(47, 'qr_ord22_1', 'active', 150.00, 22, 20),
(48, 'qr_ord22_2', 'active', 150.00, 22, 20),
(49, 'qr_ord22_3', 'active', 150.00, 22, 20),
(50, 'qr_ord22_4', 'active', 150.00, 22, 20),
-- Order 23 (Event 21 - Summer - 600.00)
(51, 'qr_ord23_1', 'active', 600.00, 23, 21),
(52, 'qr_ord23_2', 'active', 600.00, 23, 21),
-- Order 24 (Event 22 - Finale - 2000.00)
(53, 'qr_ord24_1', 'active', 2000.00, 24, 22),
(54, 'qr_ord24_2', 'active', 2000.00, 24, 22);