const mongoose = require('mongoose');
const { Schema } = mongoose

const reservaSchema = new Schema({

    servicio: String,
    region: String,
    horario: String,
    fechareserva: String,
    usuario: String,
    fechacompra: String,
    personas: String,
    calidad: String


})

module.exports = mongoose.model('reserva', reservaSchema)