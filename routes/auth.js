const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "https://project-management-tool-app.onrender.com" }),
  (req, res) => {
    res.redirect("https://project-management-tool-app.onrender.com/project");
  }
);

router.get("/current_user", (req, res) => {
  res.send(req.user);
});

module.exports = router;
