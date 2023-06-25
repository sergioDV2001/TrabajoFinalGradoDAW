const router = require('express').Router()
const passport = require('passport');

router.get('/', (req,res,next) =>{

  res.render('registro');

})

router.post('/', passport.authenticate('local-registro', {
successRedirect: '/perfil',
failureRedirect: '/registro',
failureFlash: true
})); 
 

module.exports = router;
