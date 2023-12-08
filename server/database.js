let pool = null;
 
const initializeMariaDB = () => {

  const mariadb = require("mariadb");

  pool = mariadb.createPool({

    database: process.env.DB_NAME || "mydb",

    host: process.env.DB_HOST || "localhost",

    user: process.env.DB_USER || "user",

    password: process.env.DB_PASSWORD || "123456",

    connectionLimit: 5,

  });

};
 
 
const executeSQL = async (query) => {

  let conn;

  try {

    conn = await pool.getConnection();

    const res = await conn.query(query);

    return res;

  } catch (err) {

    console.log(err);

  } finally {

    if (conn) conn.release();

  }

};
 
const initializeDBSchema = async () => {

  const usersTableQuery = ``;

  await executeSQL(usersTableQuery);

  const bookingTableQuery = `

  CREATE TABLE IF NOT EXISTS booking (
    id INT AUTO_INCREMENT PRIMARY KEY,
    checkIn DATE,
    checkOut DATE,
    articleName VARCHAR(255),
    bookingTime VARCHAR(255)
  )`;

  await executeSQL(bookingTableQuery);

  const articleTableQuery = `
  
    CREATE TABLE IF NOT EXISTS articles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    articleId VARCHAR(255),
    priceForDay FLOAT
  )`;

  await executeSQL(articleTableQuery);

};
 
module.exports = { executeSQL, initializeMariaDB, initializeDBSchema };