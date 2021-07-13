const controller = {};
const { Mongoose } = require("mongoose");
const Empresas = require("./../models/empresas.model");
const empresaModel = new Empresas();

controller.listar = (req, res) => {
  Empresas.find(function (err, empresas) {
    if (!empresas || empresas.length === 0) {
      return res.status(200).send({
        status: false,
        message: "No hay empresas",
      });
    }
    return res.status(200).send({
      status: true,
      message: "Se encontraron " + empresas.length + " empresas",
      empresas: empresas,
    });
  });
};

controller.listarPorId = (req, res) => {
  const { id } = req.params;

  const findId = Empresas.where({ _id: id });
  try {
    findId.findOne(function (err, empresa) {
      if (!empresa) {

        return res.status(404).send({
          status: false,
          message: `La empresa con id ${id} no existe`,
        });
      } else {

        return res.status(200).send({
          status: true,
          message: "se encontro una empresa",
          empresas: empresa || "",
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

  empresaModel.tipo_documento = data.tipoDocumento;
  empresaModel.documento = data.nroDocumento;
  empresaModel.razon_social = data.razonSocial;

  var yaExiste = await Empresas.findOne({ documento: data.nroDocumento });
  if (yaExiste) {
    return res.status(201).json({
      status: false,
      message: "Empresa creada anteriormente"
    });
  } else {
    await empresaModel.save((error, empresaCreada) => {
      if (error) {
        return res.status(201).json({
          status: false,
          message: "Empresa no creada",
          detail: error,
        });
      }
  
      return res.status(201).json({
        status: true,
        message: "Empresa creada con exito",
        detail: empresaCreada.name,
      });
    });
  }
};

module.exports = controller;
