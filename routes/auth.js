const express = require("express");
const passport = require("passport");
const { register, login, logout, getMe } = require("../controllers/auth.js");
const protect = require("../middleware/auth");

const authRouter = express.Router();

authRouter.route("/register").post(register);

authRouter.route("/login").post(login);

authRouter.route("/logout").get(logout);

authRouter.route("/me").get(protect, getMe);

authRouter
  .route("/google")
  .get(
    passport.authenticate("google", { scope: ["email", "password", "profile"] })
  );

authRouter
  .route("/google/callback")
  .get(
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
      res.redirect("/");
    }
  );

module.exports = authRouter;
