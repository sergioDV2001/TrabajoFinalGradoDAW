// conexion base de datos

const mongoose = require('mongoose');    
require('dotenv').config()

const uri = `mongodb+srv://sergio:sergio123@cluster0.fyjm4.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(uri)
.then(() => {console.log('BASE DE DATOS CONECTADA')})
.catch((err) => {console.log(err)});
