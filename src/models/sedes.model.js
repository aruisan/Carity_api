/* eslint-disable max-len */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Sedes = new Schema({
    nombre: {
        type: String,
        required: true,
        maxlength: 45,
    },
    direccion: {
        type: String,
        required: true,
        maxlength: 45,
    },
    ciudad_id: {
        type: Number,
        required: true,
    },
    empresa_id: {
        type: Schema.Types.ObjectId,
    },
    fecha_creacion: {
        type: Date,
        default: Date.now,
    },
    fecha_actualizacion: {
        type: Date,
    },
});

module.exports = mongoose.model("Sedes", Sedes);
