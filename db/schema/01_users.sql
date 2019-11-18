-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  item_id INTEGER REFERENCES items(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL
);
