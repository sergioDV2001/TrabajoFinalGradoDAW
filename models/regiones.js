const mongoose = require('mongoose');
const { Schema } = mongoose

const regionesSchema = new Schema({

    nombre: String

})

module.exports = mongoose.model('regiones', regionesSchema)