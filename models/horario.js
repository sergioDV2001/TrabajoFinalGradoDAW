const mongoose = require('mongoose');
const { Schema } = mongoose

const horariosSchema = new Schema({

    hora: String

})

module.exports = mongoose.model('horarios', horariosSchema)