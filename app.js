const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const http = require("http");

//inicializaciones
const app = express();
require('./database')
require('./passport/local-auth')


//settings
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set('port', process.env.PORT || 3001)



//middlewares
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
    
    secret: 'morde',
    resave: false,
    saveUninitialized: false
    
}))
app.use(flash());
app.use(passport.initialize())
app.use(passport.session())
app.use(bodyParser.json())
app.use('/public', express.static('public'));


app.use((req,res,next) => {

    app.locals.mensajeError = req.flash('mensajeError')
    app.locals.user = req.user;
    next();

});


// archivos rutas
app.use('/', require('./router/index'))


// servidor
app.listen(app.get('port'), ()=>{

    console.log(`Servidor escuchando en http://localhost:${app.get('port')}`);

})
