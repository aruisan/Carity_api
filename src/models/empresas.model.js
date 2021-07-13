/* eslint-disable max-len */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Empresas = new Schema({
    tipo_documento: {
        type: Number
    },
    documento: {
        type: String,
        required: true,
        maxlength: 25,
    },
    razon_social: {
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

module.exports = mongoose.model("Empresas", Empresas);
