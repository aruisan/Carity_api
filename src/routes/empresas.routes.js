const Router = require("express");
const api = new Router();
const empresasController = require("../controllers/empresas.controller");
const auth = require("../middlewares/auth");

api.get("/empresas", auth.verifyToken, empresasController.listar);
api.post("/empresas/crear", auth.verifyToken, empresasController.crear);
// api.get("/empresas/:id", auth.verifyToken, equiposController.listarPorId);
// api.patch("/equipos/:id", auth.verifyToken, equiposController.update);
// api.delete("/equipos/:id", auth.verifyToken, equiposController.delete);


module.exports = api;
