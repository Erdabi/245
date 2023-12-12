const { initializeMariaDB, executeSQL } = require("./database");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const pino = require("pino")();
const nodemailer = require('nodemailer');


let db;
const jwtSecret = "supersecret";
initializeMariaDB();
const authMiddleware = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    pino.error("No authorization header.");
    return res.status(401).json({ error: "No authorization header." });
  }
  const [prefix, token] = authorization.split(" ");
  if (prefix !== "Bearer") {
    pino.error("Invalid authorization prefix.");
    return res.status(401).json({ error: "Invalid authorization prefix." });
  }
  try {
    const tokenValidation = jwt.verify(token, jwtSecret);
    if (!tokenValidation?.data) {
      pino.error("Invalid token.");
      return res.status(401).json({ error: "Invalid token." });
    }
    next();
  } catch (error) {
    pino.error("Token verification error:", error.message);
    return res.status(401).json({ error: "Token verification error." });
  }
};


function containsInjection(str) {
  const htmlAndSqlPattern = /<[^>]*>|(\bSELECT|INSERT|UPDATE|DELETE|FROM|WHERE|DROP|ALTER|CREATE|TABLE|script)\b/i;
  return htmlAndSqlPattern.test(str);
}




async function sendEmail(to, subject, text) {
  const transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
          user: 'csbestudentexample@gmail.com', 
          pass: 'HAejaler1245' 
      }
  });

  const mailOptions = {
      from: 'csbestudentexample@gmail.com',
      to: to,
      subject: subject,
      text: text
  };

  try {
      await transporter.sendMail(mailOptions);
      pino.info('Email sent successfully');
  } catch (error) {
      pino.error('Error sending email:', error.message);
  }
}

const initializeAPI = (app) => {
  app.post("/api/users", postRegisterUsers);
  app.post("/api/booking", postRoomReservationData);
  app.post("/api/booking", postParkingReservationData);
};

const postRegisterUsers = async (req, res) => {
  const { username, city, street, eMail, phoneNumber, password } = req.body;
  const sqlUsername = username;
  const sqlCity = city;
  const sqlStreet = street;
  const sqlEMail = eMail;
  const sqlPhoneNumber = phoneNumber;
  const sqlPassword = password;

  // Hier deine SQL-Abfrage mit den angepassten Daten
  const sqlQuery = `INSERT INTO users (username, city, street, email, tel, password) VALUES ('${sqlUsername}', '${sqlCity}', '${sqlStreet}', '${sqlEMail}', '${sqlPhoneNumber}', '${sqlPassword}')`;

  // Verwenden Sie executeSQL statt connection.query
  console.log(sqlQuery);
  await executeSQL(sqlQuery);
};

 
 
const postRoomReservationData = async (req, res) => {
  const { checkIn, checkOut, roomName, bookingTime } = req.body;
  const sqlCheckIn = checkIn;
  const sqlCheckOut = checkOut;
  const sqlRoomName = roomName;
  const sqlBookingTime = bookingTime;


  // Hier deine SQL-Abfrage mit den angepassten Daten
  const sqlQuery = `INSERT INTO booking (check_in, check_out, articleName, bookingtime) VALUES ('${sqlCheckIn}', '${sqlCheckOut}', '${sqlRoomName}', '${sqlBookingTime}')`;

  // Verwenden Sie executeSQL statt connection.query
  console.log(sqlQuery);
  await executeSQL(sqlQuery);
};

const postParkingReservationData = async (req, res) => {
  const { parkingCheckIn, parkingCheckOut, parkingNumber, parkingTime } = req.body;
  const sqlParkingCheckIn = parkingCheckIn;
  const sqlParkingCheckOut = parkingCheckOut;
  const sqlParkingName = parkingName;
  const sqlParkingTime = parkingTime;

  // Hier deine SQL-Abfrage mit den angepassten Daten
  const sqlQuery = `INSERT INTO booking (check_in, check_out, articleName, bookingTime) VALUES ('${sqlParkingCheckIn}', '${sqlParkingCheckOut}', '${sqlParkingNumber}', '${sqlParkingTime}')`;

  // Verwenden Sie executeSQL statt connection.query
  console.log(sqlQuery);
  await executeSQL(sqlQuery);
};


 
 
const getReservations = async (req, res) => {
  const getBookings = await executeSQL('SELECT * FROM booking');
  const result = getBookings;
 
  res.json(result);
 
}
  

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
    const user = await queryDB(db, query);

    if (user.length === 1) {
      const username = user[0].username;
      const token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
          data: username,
        },
        jwtSecret
      );
      res.json({ token });
    } else {
      pino.error("Username or password invalid.");
      res.status(401).json({ error: "Username or password invalid!" });
    }
  } catch (error) {
    pino.error("Login error:", error.message);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

module.exports = { initializeAPI, getReservations };
