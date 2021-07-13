/* eslint-disable max-len */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Roles = new Schema({
    nombre: {
        type: String,
        maxlength: 50,
        required: true
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

module.exports = mongoose.model("Roles", Roles);
