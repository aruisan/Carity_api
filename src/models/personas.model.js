/* eslint-disable max-len */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bcrypt = require("bcrypt");

const validateEmail = function (email) {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

const Personas = new Schema({
    tipo_documento: {
        type: Number,
        required: true,
    },
    documento: {
        type: String,
        required: true,
        maxlength: 25,
    },
    nombre: {
        type: String,
        required: true,
        maxlength: 50,
    },
    primer_apellido: {
        type: String,
        required: true,
        maxlength: 30
    },
    segundo_apellido: {
        type: String,
        maxlength: 30
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: "Dirección de correo electrónico es obligatorio",
        validate: [validateEmail, "Ingrese una dirección de correo electrónico valida"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Ingrese una dirección de correo electrónico valida"],
    },
    telefono: {
        type: String
    },
    tipo_persona_id: {
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
});

module.exports = mongoose.model("Personas", Personas);
