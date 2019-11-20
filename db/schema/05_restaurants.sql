DROP TABLE IF EXISTS restaurants CASCADE;

CREATE TABLE restaurants
  (
    id SERIAL PRIMARY KEY NOT NULL,
    item_id INTEGER REFERENCES items(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    street VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    province VARCHAR(255) NOT NULL,
    post_code VARCHAR(255) NOT NULL,
    rating SMALLINT NOT NULL DEFAULT 0,
    -- hours_of_operation VARCHAR(500),
    image VARCHAR(500),
    price_range VARCHAR(255),
    is_active BOOLEAN NOT NULL DEFAULT FALSE
  );
