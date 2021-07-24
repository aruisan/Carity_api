const controller = {};
const { Mongoose } = require("mongoose");

const Documentacion = require("./../models/documentacion.model");
const EquiposDocumentacion = require("./../models/equipo_documentacion.model");

/**
 * funcion para listar la documentacion de un equipo
 * se enlista las relaciones de documentacion_id , equipo_id y se relaciona la documentacion perteneciente
 * retorna un array de objetos 
 */
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

/**
 * 
 * @param {links, manuales, archivos_id, equipo_id} req 
 * @param {*} res 
 * @returns 
 * 
 * funcion para guardar manuales y videos precargados en la vista asignar de equipos 
 * links es un array de objetos para guardar los links de videos
 * manuales es un array de objetos para guardar los links de los manuales
 * archivos_id es un array contenedor de ids de documentos para relacionarlos al equipo
 * equipo_id id del equipo para relacionar la documentación
 * 
 * retorna un mensaje diciendo que todo se guardo en el back 
 */
controller.crear = async (req, res) => {
  const data = req.body;
  console.log('links', data.links);
  if (!data) {
    res.status(404).send({
      status: false,
      message: "Validar los campos",
    });
  }


/***
 * se valida con un if para el params links no venga vacia
 */
  if(data.links.length > 0){
    /***
     * hace un recorrido al array para tomar individualmente cada objeto y almacenarlo en el modelo documentación
     */
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

      /***
       * se relaciona el id del equipo almacenado en el params equipo_id y el id de el documento generado con la constante documentacionModel
       */
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

/***
 * se valida con un if para el params manuales no venga vacia
 */
  if(data.manuales.length > 0){
    /***
     * hace un recorrido al array para tomar individualmente cada objeto y almacenarlo en el modelo documentación
     */
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
         /***
         * se relaciona el id del equipo almacenado en el params equipo_id y el id de el documento generado con la constante documentacionModel
         */
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

  
/***
 * se valida con un if para el params archivos_ids no venga vacia
 */
  if(data.archivos_ids.length > 0){
    /***
     * se hace un recorrido a cada id y se relaciona con el id del equipo contenido en el params equipo_id
     */
    data.archivos_ids.forEach(e =>{
      const EquiposDocumentacionModal = new EquiposDocumentacion({
        equipo_id:new mongoose.mongo.ObjectId(data.equipo_id),
        documentacion_id:new mongoose.mongo.ObjectId(e)
      });

      EquiposDocumentacionModal.save(function (error) {
        if (error) {
          return res.status(201).json({
            status: false,
            message: "Archivo no relacionado al equipo",
            detail: error,
          });
        }
      });
    })
  }

/***
 * retorna un 201 con un mensaje de videos creadops con exito.
 */
  return res.status(201).json({
    status: true,
    message: "videos creados con exito"
  });

};

module.exports = controller;
