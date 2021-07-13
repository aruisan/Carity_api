const controller = {};
const { Mongoose } = require("mongoose");
const tiposEquipo = require("../models/tiposEquipo.model");
const Equipos = require("./../models/equipos.model");
const equiposModel = new Equipos();

controller.listar = async (req, res) => {
  const filtro = req.query.filtro;

  var condition = filtro ? {
    $or: [
      { nombre: { $regex: `.*${filtro}*.`, $options: 'i' } },
      { referencia: { $regex: `.*${filtro}*.`, $options: 'i' } },
    ]
  } : null;

  var findId = Equipos;
  if (condition != null) {
    findId = Equipos.where(condition);
  }

  var equipos = await findId.find().populate("tipo_id");
  if (!equipos || equipos.length === 0) {
    return res.status(200).send({
      status: false,
      message: "No hay equipos",
    });
  } else {
    return res.status(200).send({
      status: true,
      message: "Se encontraron " + equipos.length + " equipos",
      equipos: equipos,
    });
  }
};

controller.listarPorId = async (req, res) => {
  const { id } = req.params;
  try {
    var equipoFind = await Equipos.where({ _id: id }).find().populate("tipo_id");
    if (!equipoFind) {
      return res.status(404).send({
        status: false,
        message: `El equipo con ID ${id} no existe`,
      });
    } else {
      return res.status(200).send({
        status: true,
        message: "se encontro un dispositivo",
        equipos: equipoFind[0] || "",
      });
    }
  } catch (error) {
    return new Error(error);
  }
};

controller.uploadFiles = async (req, res) => {
  let formData = new FormData();

    formData.append("file", file);

    return http.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
};

controller.getFiles = async (req, res) => {
  return http.get("/files");
};

controller.crear = async (req, res) => {
  // const data = req.body;

  // if (!data) {
  //   res.status(404).send({
  //     status: false,
  //     message: "Validar los campos",
  //   });
  // }

  // equiposModel.nombre = "Equipo de pulsación magnetica RHAGA 2000";
  // equiposModel.imagen = "";
  // equiposModel.referencia = "PUMA RHAGA 2000 X";
  // equiposModel.hardware_id = "";
//   equiposModel.estado_id = "1";
  // equiposModel.tipo_equipo = {
  //   "$oid": "60dcf5998d3acb23457e7c73"
  // };
//   equiposModel.usuario_sede_id = {
//     "$oid": "60dcf6408d3acb23457e7c74"
// };

  // var guardado = await equiposModel.save();
  // if (guardado) {
  //   return res.status(201).json({
  //     status: false,
  //     message: "Persona no creada",
  //     detail: error,
  //   });
  // }

  // return res.status(201).json({
  //   status: true,
  //   message: "Persona creada con exito",
  //   detail: empresaCreada.name,
  // });

};

module.exports = controller;
