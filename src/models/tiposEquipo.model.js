const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tiposEquipo = new Schema({
    nombre: {
        type: String,
        maxlength: 50,
        required: true,
        alias: 'tipo'
    },
    descripcion: {
        type: String,
        maxlength: 50,
        required: true
    },
    fecha_creacion: {
        type: Date,
        default: Date.now,
    },
    fecha_actualizacion: {
        type: Date,
    },
});

module.exports = mongoose.model("tiposEquipo", tiposEquipo);
