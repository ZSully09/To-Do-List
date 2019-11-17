//database functions

const addUser = function (user, db) {
  return db.query(`
  INSERT INTO users(email,password) VALUES($1,$2) RETURNING *;
`, [`${user.email}`, `${user.password}`]).then(data => {
    if (data.rows.length) {
      return data.rows[0];
    }
  });
};
const getUserByEmail = function (email, db) {
  return db.query(`
  SELECT * FROM users WHERE email=$1`, [`${email}`]);
};
module.exports = {
  addUser,
  getUserByEmail
};
