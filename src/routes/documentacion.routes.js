const Router = require("express");
const api = new Router();
const documentacionController = require("../controllers/documentacion.controller");
const auth = require("../middlewares/auth");
/*
api.get("/documentacion", auth.verifyToken, documentacionController.listar);
api.get("/documentacion/:id", auth.verifyToken, documentacionController.listarPorId);
api.post("/documentacion/crear", auth.verifyToken, documentacionController.crear);
*/
api.get("/documentacion", documentacionController.listar);
api.get("/documentacion/:id", documentacionController.listarPorId);
api.post("/documentacion/crear", documentacionController.crear);


// api.get("/documentacion/:id", auth.verifyToken, documentacionController.listarPorId);
// api.patch("/documentacion/:id", auth.verifyToken, documentacionController.update);
// api.delete("/documentacion/:id", auth.verifyToken, documentacionController.delete);


module.exports = api;
