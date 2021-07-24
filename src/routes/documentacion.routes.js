const Router = require("express");
const api = new Router();
const documentacionController = require("../controllers/documentacion.controller");
const auth = require("../middlewares/auth");

/*** ruta para listar los documentos */
api.get("/documentacion", auth.verifyToken, documentacionController.listar);
/*** ruta para ver un documento */
api.get("/documentacion/:id", auth.verifyToken, documentacionController.listarPorId);
/*** ruta para crear un documento */
api.post("/documentacion/crear", auth.verifyToken, documentacionController.crear);


// api.get("/documentacion/:id", auth.verifyToken, documentacionController.listarPorId);
// api.patch("/documentacion/:id", auth.verifyToken, documentacionController.update);
// api.delete("/documentacion/:id", auth.verifyToken, documentacionController.delete);


module.exports = api;
