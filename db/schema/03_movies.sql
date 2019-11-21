DROP TABLE IF EXISTS movies CASCADE;

CREATE TABLE movies
  (
    id SERIAL PRIMARY KEY NOT NULL,
    item_id INTEGER REFERENCES items(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    director VARCHAR(255) NOT NULL,
    actors VARCHAR(500) NOT NULL,
    rating VARCHAR(255) DEFAULT 'None',
    image VARCHAR(500),
    duration VARCHAR(255),
    description TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE
  );

-- Possibly needs to be renamed as project description shows films/series
