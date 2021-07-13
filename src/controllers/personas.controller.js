const controller = {};
const { Mongoose } = require("mongoose");
const Personas = require("./../models/personas.model");
const personaModel = new Personas();

controller.listar = (req, res) => {
  Personas.find(function (err, personas) {
    if (!personas || personas.length === 0) {
      return res.status(200).send({
        status: false,
        message: "No hay personas",
      });
    }
    return res.status(200).send({
      status: true,
      message: "Se encontraron " + personas.length + " personas",
      personas: personas,
    });
  });
};

controller.listarPorId = (req, res) => {
  const { id } = req.params;

  const findId = Personas.where({ _id: id });
  try {
    findId.findOne(function (err, persona) {
      if (!persona) {

        return res.status(404).send({
          status: false,
          message: `La persona con id ${id} no existe`,
        });
      } else {

        return res.status(200).send({
          status: true,
          message: "se encontro una persona",
          personas: persona || "",
        });
      }
    });
  } catch (error) {
    return new Error(error);
  }
};

controller.crear = async (req, res) => {
  const data = req.body;

  if (!data) {
    res.status(404).send({
      status: false,
      message: "Validar los campos",
    });
  }

  personaModel.tipo_documento = data.tipoDocumento;
  personaModel.tipo_persona_id = data.tipoPersona;
  personaModel.documento = data.nroDocumento;
  personaModel.nombre = data.nombres;
  personaModel.primer_apellido = data.primerApellido;
  personaModel.segundo_apellido = data.segundoApellido;
  personaModel.email = data.email;
  personaModel.telefono = data.telefono;

  var yaExiste = await Personas.findOne({ documento: data.nroDocumento });
  if (yaExiste) {
    return res.status(201).json({
      status: false,
      message: "Persona creada anteriormente"
    });
  } else {
    await personaModel.save((error, empresaCreada) => {
      if (error) {
        return res.status(201).json({
          status: false,
          message: "Persona no creada",
          detail: error,
        });
      }

      return res.status(201).json({
        status: true,
        message: "Persona creada con exito",
        detail: empresaCreada.name,
      });
    });
  }
};

module.exports = controller;
