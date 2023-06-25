const router = require("express").Router();
const passport = require("passport");

router.get("/login", (req, res) => {
    res.render("login");
  });
  
  router.post("/login",passport.authenticate("local-login", {
  
      successRedirect: "/perfil",
      failureRedirect: "/login",
      passReqToCallback: true,
  
    })
  );

module.exports = router;