const mongoose = require('mongoose');
const { Schema } = mongoose

const calidadesSchema = new Schema({

    nombre: String,
    precio: Number

})

module.exports = mongoose.model('calidades', calidadesSchema)