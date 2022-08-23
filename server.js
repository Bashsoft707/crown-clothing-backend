const express = require("express");
const dotenv = require("dotenv");
const authRouter = require("./routes/auth");
const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const cors = require('cors');

dotenv.config({ path: "./config/config.env" });

connectDB();

const app = express();

app.use(express.json());

app.use(cookieParser());

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
