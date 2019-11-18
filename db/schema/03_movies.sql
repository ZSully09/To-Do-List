DROP TABLE IF EXISTS movies CASCADE;

CREATE TABLE movies
  (
    id SERIAL PRIMARY KEY NOT NULL,
    item_id INTEGER REFERENCES items(id) ON DELETE CASCADE,
    director VARCHAR(255) NOT NULL,
    actors VARCHAR(500) NOT NULL,
    rating SMALLINT NOT NULL DEFAULT 0,
    image VARCHAR(500),
    duration SMALLINT,
    description TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE
  );

-- Possibly needs to be renamed as project description shows films/series