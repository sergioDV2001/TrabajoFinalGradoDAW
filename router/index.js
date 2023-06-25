const router = require('express').Router() /* mirar comprobacion tarjetas de ccreditos */
const passport = require('passport');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const Servicios = require('../models/servicios')
const Regiones = require('../models/regiones')
const Horarios = require('../models/horario')
const Calidades = require('../models/calidades')
const Reserva = require('../models/reserva')
const Usuario = require('../models/usuario')
const Puntuacion = require('../models/puntuacion')


router.get("/", (req, res) => {
    res.render("index");
});


router.get("/servicios", (req, res) => {

    res.render('servicios');

});


router.get("/contacto", (req, res) => {
    res.render("contacto", {

        mimensaje: "false"

    });
});

router.post("/contacto", (req, res) => {

    console.log(req.body)

    const { email, nombre, asunto, mensaje } = req.body;
    
    contentHTML = `
    
    <h1>Nihon</h1>
        
    <ul>
        
        <li>Correo electronico: ${email}</li>
        <li>Asunto: ${asunto}</li>
        <li>Nombre: ${nombre}</li>
        
    </ul>

        <span><h2>Mensaje:</h2> <h3>${mensaje}</h3></span>

    `;

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'noemy.lowe63@ethereal.email',
            pass: 'CXCF9t7f4DY3WnjaPr'
        }
    });

    const mailOptions = {

        from: `Contacto ${nombre} Nihon  <${email}>`,
        to: 'serllio2001@gmail.com',
        subject: asunto,
        html: contentHTML,

    }

    transporter.sendMail(mailOptions, (error, info) =>{

        if (error) {

            console.log(error)
            
        } else {
            
            res.render('contacto', {

                mimensaje: 'true'
    
            })

        }

    })

});


router.get("/reservas", (req, res) => {

    res.render('reservas', {

        confirmar: "false"


    });

});




router.get("/reservas/compra", isAuthenticated, async (req, res) => {

    try {
        
        const arrayServiciosDB = await Servicios.find()
        const arrayRegionesDB = await Regiones.find()
        const arrayHorariosDB = await Horarios.find()
        const arrayCalidadesDB = await Calidades.find()
        

        res.render("compra", {
            arrayServicios: arrayServiciosDB,
            arrayRegiones: arrayRegionesDB,
            arrayHorarios: arrayHorariosDB,
            arrayCalidades: arrayCalidadesDB
        })

    } catch (error) {
        console.log(error)
    }


});

router.get('/CuantoSabesDeJapon', async(req, res, next) => {

    const arrayPuntuacionDB = await Puntuacion.find().sort({puntos: -1})
    

    if (req.user) {

        res.render('CuantoSabesDeJapon', {

            usuario: req.user.nombre,
            arrayPuntuacion: arrayPuntuacionDB
    
        });
        
    }else{


        res.render('CuantoSabesDeJapon', {

            usuario: '',
            arrayPuntuacion: arrayPuntuacionDB
    
        });

    }

})

router.get('/JugarPartida', isAuthenticated ,(req, res, next) => {

    res.render('JugarPartida', {

        nombre: req.user.nombre,
        apellidos: req.user.apellidos

    });

})

router.post('/JugarPartida', isAuthenticated , async (req, res, next) => {

    console.log(req.body)

    const nuevaPuntuacion = new Puntuacion()
    nuevaPuntuacion.usuario = req.body.nombre;
    nuevaPuntuacion.puntos = req.body.puntos;
    await nuevaPuntuacion.save();
    
    res.redirect('/CuantoSabesDeJapon')

})


router.post('/reservas/compra', isAuthenticated, async (req, res, next) => {

    let formulario = req.body

    

    if (formulario.personasStandard !== "") {

        const nuevaReserva = new Reserva()
        nuevaReserva.servicio = formulario.servicio[0];
        nuevaReserva.region = formulario.region[0];
        nuevaReserva.horario = formulario.horario[0];
        nuevaReserva.fechareserva = formulario.fechareserva;
        nuevaReserva.usuario = req.user.email;
        nuevaReserva.personas = formulario.personasStandard;
        nuevaReserva.fechacompra = formulario.fechacompra;
        nuevaReserva.calidad = "Standard";
        await nuevaReserva.save();
        
    }

    if (formulario.personasPremium !== "") {

        const nuevaReserva = new Reserva()
        nuevaReserva.servicio = formulario.servicio[0];
        nuevaReserva.region = formulario.region[0];
        nuevaReserva.horario = formulario.horario[0];
        nuevaReserva.fechareserva = formulario.fechareserva;
        nuevaReserva.usuario = req.user.email;
        nuevaReserva.personas = formulario.personasPremium;
        nuevaReserva.calidad = "Premium";
        await nuevaReserva.save();
        
    }

    if (formulario.personasVIP !== "") {

        const nuevaReserva = new Reserva()
        nuevaReserva.servicio = formulario.servicio[0];
        nuevaReserva.region = formulario.region[0];
        nuevaReserva.horario = formulario.horario[0];
        nuevaReserva.fechareserva = formulario.fechareserva;
        nuevaReserva.usuario = req.user.email;
        nuevaReserva.personas = formulario.personasVIP;
        nuevaReserva.fechacompra = formulario.fechacompra;
        nuevaReserva.calidad = "VIP";
        await nuevaReserva.save();
        
    }


    res.render('reservas', {
        
        confirmar: "true"

    });

})




router.get('/cerrarSesion',  (req, res, next) => {

    req.logout();
    res.redirect('/');

})


router.get('/registro', (req, res, next) => {

    res.render('registro');

})

router.post('/registro', passport.authenticate('local-registro', {
    successRedirect: '/perfil',
    failureRedirect: '/registro',
    failureFlash: true
}));

router.get("/login", (req, res) => {

    res.render('login');

});

router.post("/login", passport.authenticate('local-login', {

    successRedirect: '/perfil',
    failureRedirect: '/login',
    passReqToCallback: true

}));

router.get('/perfil', isAuthenticated,  async(req, res) => {

    const arrayReservasDB = await Reserva.find({ usuario: req.user.email })

    res.render('perfil',{

        arrayReservas: arrayReservasDB

    })

})

router.post('/perfil', isAuthenticated,  async(req, res) => {

    console.log(req.body);
    console.log(req.body.id);


    await Usuario.findOneAndUpdate({_id: req.body.id},{

        nombre: req.body.nombreNuevo,
        apellidos: req.body.apellidosNuevo,
        telefono: req.body.telefonoNuevo, 
        direccion: req.body.direccionNuevo

    },{new: true})

    res.redirect('/perfil')

})



router.get('/borrarcuenta', isAuthenticated,  async(req, res) => {

    await Usuario.deleteOne({ _id: req.user._id })
    await Reserva.deleteMany({ email: req.user.email})
    req.logout();
    res.redirect('/');

})

router.get('/:id', isAuthenticated,  async(req, res) => {

    const id = req.params.id
    const reservaDB = await Reserva.findByIdAndDelete({ _id: id })

    if (reservaDB) {
    
    res.json({

        estado:true

    })

    }
})


function isAuthenticated(req, res, next) {

    if (req.isAuthenticated()) {

        return next();

    }

    res.redirect('/')
}


module.exports = router;