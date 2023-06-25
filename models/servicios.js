const mongoose = require('mongoose');
const { Schema } = mongoose

const serviciosSchema = new Schema({

    nombre: String

})

module.exports = mongoose.model('servicios', serviciosSchema)