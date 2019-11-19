//database functions
const bcrypt = require('bcrypt');

const addUser = function(user, db) {
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
const getUserByEmail = function(email, db) {
  return db.query(
    `
  SELECT * FROM users WHERE email=$1`,
    [`${email}`]
  );
};

// Get User by Id used to show a users email in the header.
const getUserById = function(id, db) {
  return db.query(
    `
  SELECT * FROM users WHERE id=$1`,
    [`${id}`]
  );
};

const isDuplicateName = function(category, name, db) {
  return db.query(`
    SELECT * FROM ${category} WHERE name='${name}'`
  )
    .then(res => {
      if (res.rowCount > 0) {
        return true;
      } else {
        return false;
      }
    });
};

const addMovie = function(values, db) {
  return db.query(
    `
    INSERT INTO movies (
      item_id,
      name,
      director,
      rating,
      image,
      is_active
      )
      VALUES ($1, $2, $3, $4, $5, TRUE)
    RETURNING *;
    `,
    values
  );
};

const addBook = function(values, db) {
  return db.query(
    `
    INSERT INTO movies (
      item_id,
      name,
      director,
      rating,
      image,
      is_active
      )
      VALUES ($1, $2, $3, $4, $5, TRUE)
    RETURNING *;
    `,
    values
  );
};





module.exports = {
  addUser,
  getUserByEmail,
  getUserById,
  isDuplicateName,
  addMovie
};
