const mongoose= require('mongoose')
mongoose.Promise = global.Promise;
const bcrypt = require('bcrypt')


const usuariosSchema = new mongoose.Schema({
    email:{
        type: String,
        unique: true,
        lowercase:true,
        trim:true,
    },
    nombre:{
        type: String,
        requerid: true,

    },
    password:{
        type: String,
        requerid:true,
        trim:true
    },
    token: String,
    expira:Date
})

module.exports = mongoose.model('Usuarios', usuariosSchema)