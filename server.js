const express = require("express");
const dotenv = require("dotenv");
const authRouter = require("./routes/auth");
const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");

dotenv.config({ path: "./config/config.env" });

require("./config/passport")(passport);

connectDB();

const app = express();

app.use(express.json());

app.use(cookieParser());

// Sessions
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(cors());

app.use("/api/v1/auth", authRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(`Server running in port ${PORT}`)
);

process.on("unhandledRejection", (promise, err) => {
  console.log(`Error: ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});
