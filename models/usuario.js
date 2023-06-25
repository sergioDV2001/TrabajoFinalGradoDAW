const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const { Schema } = mongoose

const usuarioSchema = new Schema({

    email: String,
    password: String,
    nombre: String,
    apellidos: String,
    telefono: Number,
    direccion: String


})

usuarioSchema.methods.encryptPassword = (password) => {

    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));

}

usuarioSchema.methods.comparePassword = function(password) {

    return bcrypt.compareSync(password, this.password);

}

module.exports = mongoose.model('usuarios', usuarioSchema)