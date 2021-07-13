/* eslint-disable max-len */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const bcrypt = require("bcrypt");

const Usuarios = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  fecha_ultimo_ingreso: {
    type: Date,
    default: Date.now,
  },
  rol_id: {
    ref: 'Roles',
    type: Schema.Types.ObjectId
  },
  persona_id: {
    ref: 'Personas',
    type: Schema.Types.ObjectId
  }
});

Usuarios.methods.comparePassword = function (candidatePassword, cb) {
  console.log('pass', candidatePassword);
  console.log('pass_strring', candidatePassword.toString());
  console.log('this_pass', this.password);

  bcrypt.compare(candidatePassword.toString(), this.password.toString(), (err, isMatch) => {
    console.log('isMatch', isMatch);
    cb(err, isMatch);
  });
};

module.exports = mongoose.model("Usuarios", Usuarios);
