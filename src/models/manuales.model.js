/* eslint-disable max-len */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Manuales = new Schema({
    alias: {
        type: String,
    },
    nombre_original: {
        type: String,
        required: true,
    },
    ruta: {
        type: String,
        required: true,
    },
    tipo_archivo: {
        type: Number,
        required: true,
    },
    fecha_creacion: {
        type: Date,
        default: Date.now,
    },
    fecha_actualizacion: {
        type: Date,
    },
},{ collection: 'manuales' });

module.exports = mongoose.model("manuales", Manuales);
