let pool = null;

const initializeMariaDB = () => {
  const mariadb = require("mariadb");
  pool = mariadb.createPool({
    database: process.env.DB_NAME || "mychat",
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "mychat",
    password: process.env.DB_PW || "mychatpassword",
    connectionLimit: 5,
  });

  console.log("MariaDB pool initialized successfully.");
};

const executeSQL = async (query) => {
  let conn;
  try {
    conn = await pool.getConnection();
    console.log("Connected to the database.");
    console.log("Executing SQL query:", query);
    const res = await conn.query(query);
    console.log("SQL query executed successfully:", query);
    return res;
  } catch (err) {
    console.error("Error executing SQL query:", query, err);
  } finally {
    if (conn) {
      console.log("Releasing database connection.");
      conn.release();
    }
  }
};

const initializeDBSchema = async () => {
  try {
    const usersTableQuery = `CREATE TABLE IF NOT EXISTS users (
      id INT NOT NULL AUTO_INCREMENT,
      email VARCHAR(255) NOT NULL UNIQUE,
      username VARCHAR(255) NOT NULL,
      street VARCHAR(255) NOT NULL,
      city int NOT NULL,
      phone VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      PRIMARY KEY (id)
  );`;
    await executeSQL(usersTableQuery);

    const bookingTableQuery = `CREATE TABLE IF NOT EXISTS booking (
        id INT AUTO_INCREMENT PRIMARY KEY,
        check_in DATE,
        check_out DATE,
        article_name VARCHAR(255),
        booking_time VARCHAR(255)
      )`;

    await executeSQL(bookingTableQuery);
    console.log("Booking table created successfully.");

    const articleTableQuery = `CREATE TABLE IF NOT EXISTS articles (
      id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(255),
        article_id VARCHAR(255),
        price_for_day FLOAT,
        PRIMARY KEY (id)
      )`;

    await executeSQL(articleTableQuery);
    console.log("Articles table created successfully.");

    console.log("Database schema initialized successfully.");
  } catch (error) {
    console.error("Error initializing database schema:", error);
  }
};

module.exports = { executeSQL, initializeMariaDB, initializeDBSchema };
