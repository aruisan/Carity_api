/* eslint-disable max-len */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Personas = new Schema({
    persona_id: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    empresa_id: {
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

module.exports = mongoose.model("Personas", Personas);
