const controller = {};

const PersonasModel = require("./../models/personas.model");
const personasModel = new PersonasModel();

const UsuariosModel = require("./../models/usuarios.model");
const usuariosModel = new UsuariosModel();

const { hashPassword, createToken } = require("../services/auth");

controller.signin = async (req, res) => {
  
  const { email, password } = req.body;
  const findPersona = PersonasModel.where({ email: email });

  findPersona.findOne(function (err, persona) {
    if (!persona) {
      res.status(404).send({
        status: false,
        message: "Error en credenciales / persona",
      });
    } else {
      UsuariosModel.where({ persona_id: persona._id }).findOne(function (err, usuario) {
        if (!usuario) {
          res.status(404).send({
            status: false,
            message: "Error en credenciales / usuario",
          });
        } else {
         return usuario.comparePassword(password, (error, isMatch) => {
            if (error) {
              return res.status(409).json({
                status: false,
                message: "Problema de servidor",
              });
            } else if (isMatch) {
              //else if (!isMatch) {
              return res.status(403).json({
                status: false,
                message: "Error en credenciales",
              });
            } else {
              const tokenJwt = createToken(usuario);
              return res.status(200).json({
                status: true,
                message: "Bienvenido",
                token: tokenJwt,
                persona: persona,
                usuario: usuario
              });
            }
          });
        }
      });

    }
  });
};

module.exports = controller;
