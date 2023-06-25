const mongoose = require('mongoose');
const { Schema } = mongoose

const puntuacionSchema = new Schema({

    usuario: String,
    puntos: Number

})

module.exports = mongoose.model('puntuacions', puntuacionSchema)