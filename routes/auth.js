const express = require("express");
const passport = require("passport");

const router = express.Router();

router.get("/auth/google", passport.authenticate("google", {
  scope: ["profile", "email"],  
  prompt: "select_account" 
}));

router.get("/auth/google/callback", passport.authenticate("google", {
  failureRedirect: "/login",
  successRedirect: "https://project-management-tool-app.onrender.com/project", 
}));

router.get("/current_user", (req, res) => {
  res.send(req.user);
});

module.exports = router;
