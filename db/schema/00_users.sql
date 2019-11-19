-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS users
CASCADE;
CREATE TABLE users
(
  id SERIAL PRIMARY KEY NOT NULL,
  email VARCHAR(255),
  password VARCHAR(255)
);

