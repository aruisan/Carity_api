const controller = {};
const { Mongoose } = require("mongoose");

const Documentacion = require("./../models/documentacion.model");
const EquiposDocumentacion = require("./../models/equipo_documentacion.model");


controller.listar =  (req, res) => {
  let data = req.body;
  console.log('req.body', req.body);
  EquiposDocumentacion.find()
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


controller.listarPorId = async (req, res) => {
  const { id } = req.params;

  const filtro = req.query.filtro;

  var condition = filtro ? {
    $or: [
      { alias: { $regex: `.*${filtro}*.`, $options: 'i' } },
      { nombre_original: { $regex: `.*${filtro}*.`, $options: 'i' } },
    ]
  } : null;

  findId = EquiposDocumentacion;
  if (condition != null) {
    findId = EquiposDocumentacion.where(condition);
  }

  try {
    var documentacion = await findId.where({ equipo_id: id }).find().populate("documentacion_id");
    return await res.status(200).send({
      status: true,
      message: "se encontro documentacion",
      documentacion: documentacion,
    });
  } catch (error) {
    return new Error(error);
  }
};

controller.crear = async (req, res) => {
  const data = req.body;
  console.log('links', data.links);
  if (!data) {
    res.status(404).send({
      status: false,
      message: "Validar los campos",
    });
  }



  if(data.links.length > 0){
     data.links.forEach(video => {
      const documentacionModel = new Documentacion({
        nombre_original:video.alias,
        alias:'',
        ruta:video.url,
        tipo_archivo:2
      });

      documentacionModel.save(function (error) {
        if (error) {
          return res.status(201).json({
            status: false,
            message: "video no creada",
            detail: error,
          });
        }
      });

      const EquiposDocumentacionModal = new EquiposDocumentacion({
        equipo_id:new mongoose.mongo.ObjectId(data.equipo_id),
        documentacion_id:new mongoose.mongo.ObjectId(documentacionModel._id)
      });

      EquiposDocumentacionModal.save(function (error) {
        if (error) {
          return res.status(201).json({
            status: false,
            message: "video no relacionado al equipo",
            detail: error,
          });
        }
      });
    });
  }


  if(data.manuales.length > 0){
    data.manuales.forEach(video => {
        const documentacionModel = new Documentacion({
          nombre_original:video.nombre,
          alias:video.alias,
          ruta:video.ruta,
          tipo_archivo:1
        });
        documentacionModel.save(function (error) {
          if (error) {
            return res.status(201).json({
              status: false,
              message: "video no creada",
              detail: error,
            });
          }
        });

        const EquiposDocumentacionModal = new EquiposDocumentacion({
          equipo_id:new mongoose.mongo.ObjectId(data.equipo_id),
          documentacion_id:new mongoose.mongo.ObjectId(documentacionModel._id)
        });

      EquiposDocumentacionModal.save(function (error) {
        if (error) {
          return res.status(201).json({
            status: false,
            message: "video no relacionado al equipo",
            detail: error,
          });
        }
      });
    });
  }


  return res.status(201).json({
    status: true,
    message: "videos creados con exito"
  });

};

module.exports = controller;
