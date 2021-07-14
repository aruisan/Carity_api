/* eslint-disable max-len */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const equipo_manuales = new Schema({
    equipo_id: {
        type: Schema.Types.ObjectId,
        ref: "equipos",
    },
    manual_id: {
        type: Schema.Types.ObjectId,
        ref: "manuales",
    },
    fecha_creacion: {
        type: Date,
        default: Date.now,
    },
    fecha_actualizacion: {
        type: Date,
    },
});

module.exports = mongoose.model("equipo_manuales", equipo_manuales);
