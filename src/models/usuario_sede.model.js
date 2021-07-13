/* eslint-disable max-len */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usuario_sede = new Schema({
    usuario_id: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    sede_id: {
        type: Schema.Types.ObjectId,
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

module.exports = mongoose.model("usuario_sede", usuario_sede);
