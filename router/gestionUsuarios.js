const router = require("express").Router();
const passport = require("passport");

router.get("/perfil", isAuthenticated, (req, res) => {
    res.render("perfil");
  });

  router.get("/registro", (req, res, next) => {
    res.render("registro");
  });
  
  router.post("/registro",passport.isAuthenticated("local-registro", {
      successRedirect: "/perfil",
      failureRedirect: "/registro",
      failureFlash: true,
    })
  );
  
  
  
  router.get("/cerrarSesion", (req, res, next) => {
    req.logout();
    res.redirect("/");
  });
  
  
  
  function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
  
    res.redirect("/");
  }

module.exports = router;