const controller = {};
const { Mongoose } = require("mongoose");
//const fileUpload = require('express-fileupload');

const Manuales = require("./../models/manuales.model");
const EquiposManuales = require("./../models/equipo_manuales.model");



controller.listar =  (req, res) => {
  let data = req.body;
  EquiposManuales.find()
  .populate('documentacion_id')
  .exec((err, documentacion) => {
      if (!documentacion || documentacion.length === 0) {
        return res.status(200).send({
          status: false,
          message: "No hay documentacion",
        });
      }
      
      return res.status(200).send({
        status: true,
        message: "Se encontro " + documentacion.length + " documentacion",
        documentacion: documentacion,
      });
  })
};


controller.crear = async (req, res) => {
  const data = req.body;
  console.log('data', data)
  return data;
  /*
  if (!data) {
    res.status(404).send({
      status: false,
      message: "Validar los campos",
    });
  }



  data.links.forEach(video => {

    const documentacionModel = new Documentacion({
      nombre_original:video.alias,
      ruta:video.url,
      tipo_archivo:2
    });
    documentacionModel.save(function (err) {
      if (error) {
        return res.status(201).json({
          status: false,
          message: "video no creada",
          detail: error,
        });
      }
    });

    const EquiposDocumentacionModal = new EquiposDocumentacion({
      equipo_id:data.equipo_id,
      documentacion_id:new mongoose.mongo.ObjectId(documentacionModel._id)
    });

    EquiposDocumentacionModal.save(function (err) {
      if (error) {
        return res.status(201).json({
          status: false,
          message: "video no relacionado al equipo",
          detail: error,
        });
      }
    });
  });

  return res.status(201).json({
    status: true,
    message: "videos creados con exito"
  });
  */

};

module.exports = controller;
/*
controller.crear = async (req, res) => {
  const data = req.body;

  if (!data) {
    res.status(404).send({
      status: false,
      message: "Validar los campos",
    });
  }

  data.videos.forEach(video = async () => {
    documentacionModel.alias = video.alias;
    documentacionModel.nombre_original = video.nombreOriginal;
    //documentacionModel.imagen = data.imagen;
    documentacionModel.ruta = video.ruta;
    documentacionModel.tipo_archivo = 2;

    var est = await documentacionModel.save();
  });

  return res.status(201).json({
    status: true,
    message: "Persona creada con exito",
    detail: empresaCreada.name,
  });

};
*/