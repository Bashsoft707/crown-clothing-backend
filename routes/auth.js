const express = require("express");
const passport = require("passport");
const { register, login } = require("../controllers/auth.js");

const authRouter = express.Router();

authRouter.route("/register").post(register);

authRouter.route("/login").post(login);

authRouter
  .route("/google")
  .get(passport.authenticate("google", { scope: ["profile",] }));

authRouter
  .route("/google/callback")
  .get(
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
      res.redirect("/dashboard");
    }
  );

authRouter.route("/logout").get((req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = authRouter;
