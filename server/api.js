const { initializeMariaDB, executeSQL, queryDB } = require("./database");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const window = require("window");
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

const initializeAPI = async (app) => {
  app.post(
    "/api/login",
    body("username")
      .notEmpty()
      .withMessage("Username is required.")
      .isEmail()
      .withMessage("Invalid email format."),
    body("password")
      .isLength({ min: 6, max: 64 })
      .withMessage("Password must be between 6 to 64 characters.")
      .escape(),
    login
  );
  app.post("/api/users", postRegisterUsers);
  app.post("/api/booking", postRoomReservationData);
  app.post("/api/booking", postParkingReservationData);
  app.get("/api/roomreservations", getRoomReservations);
  
  
};

const postRegisterUsers = async (req, res) => {
  const { username, city, street, eMail, phoneNumber, password } = req.body;
  const sqlUsername = username;
  const sqlCity = city;
  const sqlStreet = street;
  const sqlEMail = eMail;
  const sqlPhoneNumber = phoneNumber;
  const sqlPassword = password;
  let result = 0;

  const getUserName = await executeSQL(`SELECT username FROM users WHERE username = '${sqlUsername}'`);
  const getUserEmail = await executeSQL(`SELECT email FROM users WHERE email = '${sqlEMail}'`);
  if(getUserName.length === 1) {
    result = 1;
    res.json(result);
  } else if(getUserEmail.length === 1){
    result = 2;
    res.json(result);
  } else {
  // Hier deine SQL-Abfrage mit den angepassten Daten
  const sqlQuery = `INSERT INTO users (username, city, street, email, phone, password) VALUES ('${sqlUsername}', '${sqlCity}', '${sqlStreet}', '${sqlEMail}', '${sqlPhoneNumber}', '${sqlPassword}')`;

  // Verwenden Sie executeSQL statt connection.query
  console.log(sqlQuery);
  await executeSQL(sqlQuery);
}
};

 
 
const postRoomReservationData = async (req, res) => {
  const { checkIn, checkOut, roomName, bookingTime } = req.body;
  const sqlCheckIn = checkIn;
  const sqlCheckOut = checkOut;
  const sqlRoomName = roomName;
  const sqlBookingTime = bookingTime;


  // Hier deine SQL-Abfrage mit den angepassten Daten
  const sqlQuery = `INSERT INTO booking (check_in, check_out, article_name, booking_time) VALUES ('${sqlCheckIn}', '${sqlCheckOut}', '${sqlRoomName}', '${sqlBookingTime}')`;

  // Verwenden Sie executeSQL statt connection.query
  console.log(sqlQuery);
  await executeSQL(sqlQuery);
};

const postParkingReservationData = async (req, res) => {
  const { parkingCheckIn, parkingCheckOut, parkingNumber, parkingTime } = req.body;
  const articleName = parkingNumber;
  const sqlParkingCheckIn = parkingCheckIn;
  const sqlParkingCheckOut = parkingCheckOut;
  const sqlParkingTime = parkingTime;

  // Hier deine SQL-Abfrage mit den angepassten Daten
  const sqlQuery = `INSERT INTO booking (check_in, check_out, article_name, booking_time) VALUES ('${sqlParkingCheckIn}', '${sqlParkingCheckOut}', '${articleName}', '${sqlParkingTime}')`;

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
  const { username, password } = req.body;
  const inputName = username;
  const inputPassword = password;

  const getUsername = await executeSQL(`SELECT username FROM users WHERE username = '${inputName}' AND password = '${inputPassword}'`);
  if (getUsername.length === 1) {
    const result = true;
    res.json(result);
  }
    
};

const getRoomReservations = async (req, res) => {
  try {
    const query = 'SELECT room_name, reserved_from, reserved_until, status FROM room_reservations';
    const reservations = await executeSQL(query);
    res.json(reservations);
  } catch (error) {
    pino.error('Fehler beim Abrufen der Raumreservierungen:', error);
    res.status(500).json({ error: 'Interner Serverfehler' });
  }
};


module.exports = { initializeAPI, getReservations };
