/* eslint-disable max-len */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Equipos = new Schema({
  nombre: {
    type: String,
    maxlength: 255,
    required: true
  },
  imagen: {
    type: String,
  },
  referencia: {
    type: String,
    maxlength: 255,
  },
  hardware_id: {
    type: String,
    maxlength: 255,
  },
  estado_id: {
    type: Schema.Types.ObjectId,
    ref: "Estados_equipo",
  },
  tipo_id: {
    type: Schema.Types.ObjectId,
    ref: "tiposEquipo",
  },
  usuario_sede_id: {
    type: Schema.Types.ObjectId
  },
  fecha_creacion: {
    type: Date,
    default: Date.now,
  },
  fecha_actualizacion: {
    type: Date,
  },
});

module.exports = mongoose.model("Equipos", Equipos);
