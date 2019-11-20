/* eslint-disable camelcase */
//database functions
const bcrypt = require('bcrypt');

const addUser = function (user, db) {
  return db
    .query(
      `
  INSERT INTO users(email,password) VALUES($1,$2) RETURNING *;
`,
      [`${user.email}`, `${bcrypt.hashSync(user.password, 10)}`]
    )
    .then(data => {
      if (data.rows.length) {
        return data.rows[0];
      }
    });
};
const getUserByEmail = function (email, db) {
  return db.query(
    `
  SELECT * FROM users WHERE email=$1`,
    [`${email}`]
  );
};

// Get User by Id used to show a users email in the header.
const getUserById = function (id, db) {
  return db.query(
    `
  SELECT * FROM users WHERE id=$1`,
    [`${id}`]
  );
};

const getItemsToWatchById = function (user_id, db) {
  return db.query(
    `
    SELECT * FROM movies
    JOIN items
    ON movies.item_id = items.id
    JOIN users
    ON items.user_id = users.id
    WHERE users.id = $1
    ORDER BY created_at DESC;
    `,
    [`${user_id}`]
  );
};

const getItemsToReadById = function (user_id, db) {
  return db.query(
    `
    SELECT * FROM books
    JOIN items
    ON books.item_id = items.id
    JOIN users
    ON items.user_id = users.id
    WHERE users.id = $1
    ORDER BY created_at DESC;
    `,
    [`${user_id}`]
  );
};

const getItemsToBuyById = function (user_id, db) {
  return db.query(
    `
    SELECT * FROM products
    JOIN items
    ON products.item_id = items.id
    JOIN users
    ON items.user_id = users.id
    WHERE users.id = $1
    ORDER BY created_at DESC;
    `,
    [`${user_id}`]
  );
};

const getPlacesToEatById = function (user_id, db) {
  return db.query(
    `
    SELECT * FROM restaurants
    JOIN items
    ON restaurants.item_id = items.id
    JOIN users
    ON items.user_id = users.id
    WHERE users.id = $1
    ORDER BY created_at DESC;
    `,
    [`${user_id}`]
  );
};
const getMovieItemById = function (item_id, db) {
  return db.query(
    `
    SELECT * FROM items
    JOIN movies
    ON items.id = item_id
    WHERE item_id = $1;
    ` , [`${item_id}`]
  );
};
const getRestaurantItemById = function (item_id, db) {
  return db.query(
    `
    SELECT * FROM items
    JOIN restaurants
    ON items.id = item_id
    WHERE item_id = $1;
    ` , [`${item_id}`]
  );
};
const getBookItemById = function (item_id, db) {
  return db.query(
    `
    SELECT * FROM items
    JOIN books
    ON items.id = item_id
    WHERE item_id = $1;
    ` , [`${item_id}`]
  );
};
const getProductItemById = function (item_id, db) {
  return db.query(
    `
    SELECT * FROM items
    JOIN products
    ON items.id = item_id
    WHERE item_id = $1;
    ` , [`${item_id}`]
  );
};

module.exports = {
  addUser,
  getUserByEmail,
  getUserById,
  getItemsToWatchById,
  getItemsToReadById,
  getItemsToBuyById,
  getPlacesToEatById,
  getMovieItemById,
  getRestaurantItemById,
  getBookItemById,
  getProductItemById
};

