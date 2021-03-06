DROP TABLE IF EXISTS products CASCADE;

CREATE TABLE products
  (
    id SERIAL PRIMARY KEY NOT NULL,
    item_id INTEGER REFERENCES items(id) ON DELETE CASCADE,
    -- cost INTEGER  NOT NULL DEFAULT 0,
    name VARCHAR(255),
    link VARCHAR(500),
    rating SMALLINT NOT NULL DEFAULT 0,
    image VARCHAR(500),
    description TEXT,
    is_active BOOLEAN NOT NULL DEFAULT FALSE
  );
