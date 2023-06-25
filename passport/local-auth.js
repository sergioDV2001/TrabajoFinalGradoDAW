const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const Usuario = require('../models/usuario')

passport.serializeUser((user, done) => {

    done(null, user.id);

})

passport.deserializeUser(async(id, done) => {

    const usuario = await Usuario.findById(id);
    done(null, usuario);

})


passport.use('local-registro', new LocalStrategy({

    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true


}, async(req, email, password, done) => {


    const formulario = req.body;
    const user = await Usuario.findOne({ 'email': email });

    if (formulario.passworddos !== password) {
        
        return done(null, false, req.flash('mensajeError', 'Las contraseñas no coinciden.'))

    }


    if (user) {

        return done(null, false, req.flash('mensajeError', 'El correo electronico ya esta en uso.'))

    } else {

        const nuevoUsuario = new Usuario()
        nuevoUsuario.email = email;
        nuevoUsuario.password = nuevoUsuario.encryptPassword(password);
        nuevoUsuario.nombre = formulario.nombre;
        nuevoUsuario.apellidos = formulario.apellidos;
        nuevoUsuario.telefono = formulario.telefono;
        nuevoUsuario.direccion = formulario.direccion;
        await nuevoUsuario.save();
        done(null, nuevoUsuario);

    }


}))

passport.use('local-login', new LocalStrategy({

    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true


}, async(req, email, password, done) => {


    const usuario = await Usuario.findOne({ email: email })

    if (!usuario) {

        return done(null, false, req.flash('mensajeError', 'Usuario no encontrado'))

    }
    if (!usuario.comparePassword(password)) {

        return done(null, false, req.flash('mensajeError', 'La contraseña no es valida'))

    }

    done(null, usuario)

}))