const sqlite3 = require("sqlite3").verbose();
const pino = require("pino")();

const usersTableExists =
  "SELECT name FROM sqlite_master WHERE type='table' AND name='users'";
const createUsersTable = `CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT,
  password TEXT,
  city TEXT,
  street TEXT,
  email TEXT,
  tel TEXT
)`;
const seedUsersTable = `INSERT INTO users (username, password) VALUES
('switzerchees', '123456'),
('john', '123456'),
('jane', '123456');`

const bookingTableExists =
  "SELECT name FROM sqlite_master WHERE type='table' AND name='booking'";
const createBookingTable = `CREATE TABLE booking (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId TEXT,
  articleId TEXT,
  price FLOAT,
  checkIn TEXT,
  checkOut TEXT
)`;

const articleTableExists =
  "SELECT name FROM sqlite_master WHERE type='table' AND name='articles'";
const createArticleTable = `CREATE TABLE articles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  articleId TEXT,
  priceForDay FLOAT
)`;

const initializeDatabase = async () => {
  const db = new sqlite3.Database("./minitwitter.db");

  db.serialize(() => {
    db.get(bookingTableExists, [], async (err, row) => {
      if (err) {
        pino.error(err, "Error checking if booking table exists");
        return;
      }
      if (!row) {
        pino.info("Creating booking table");
        await db.run(createBookingTable);
      }
    });
    db.get(usersTableExists, [], async (err, row) => {
      if (err) {
        pino.error(err, "Error checking if users table exists");
        return;
      }
      if (!row) {
        pino.info("Creating users table");
        db.run(createUsersTable, [], async (err) => {
          if (err) {
            pino.error(err, "Error creating users table");
            return;
          }
          pino.info("Seeding users table");
          db.run(seedUsersTable);
        });
      }
      db.get(articleTableExists, [], async (err, row) => {
        if (err) {
          pino.error(err, "Error checking if reservations table exists");
          return;
        }
        if (!row) {
          pino.info("Creating reservations table");
          await db.run(createArticleTable);
        }
      });
    });
  });

  return db;
};

const insertDB = (db, query, values) => {
  return new Promise((resolve, reject) => {
    db.run(query, values, function (err) {
      if (err) {
        pino.error(err, "Error inserting into the database");
        return reject(err);
      }
      resolve(this.lastID);
    });
  });
};

const queryDB = (db, query) => {
  return new Promise((resolve, reject) => {
    db.all(query, [], (err, rows) => {
      if (err) {
        pino.error(err, "Error querying the database");
        return reject(err);
      }
      resolve(rows);
    });
  });
};

module.exports = { initializeDatabase, queryDB, insertDB };
