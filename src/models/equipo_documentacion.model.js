/* eslint-disable max-len */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const equipo_documentacion = new Schema({
    equipo_id: {
        type: Schema.Types.ObjectId,
        ref: "equipos",
    },
    documentacion_id: {
        type: Schema.Types.ObjectId,
        ref: "documentacion",
    },
    fecha_creacion: {
        type: Date,
        default: Date.now,
    },
    fecha_actualizacion: {
        type: Date,
    },
});

module.exports = mongoose.model("equipo_documentacion", equipo_documentacion);
