const router = require('express').Router()
const passport = require('passport');

router.get('/cerrarSesion', isAuthenticated, (req,res,next) =>{

  req.logout();
  res.redirect('/');

})

function isAuthenticated(req,res,next) {
    
    if (req.isAuthenticated()) {

        return next();
        
    }

    res.redirect('/')
}

module.exports = router;