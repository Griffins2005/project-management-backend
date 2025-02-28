const express = require("express");
const passport = require("passport");

const router = express.Router();

router.get("/google", passport.authenticate("google", {
  scope: ["profile", "email"],  
  prompt: "select_account" 
}));

router.get("/google/callback", passport.authenticate("google", {
  failureRedirect: "https://project-management-tool-app.vercel.app/login",
  successRedirect: "https://project-management-tool-app.vercel.app/project", 
}));

router.get("/current_user", (req, res) => {
  res.send(req.user);
});

module.exports = router;
