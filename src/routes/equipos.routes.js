const Router = require("express");
const api = new Router();
const equiposController = require("../controllers/equipos.controller");
const auth = require("../middlewares/auth");

api.get("/equipos", auth.verifyToken, equiposController.listar);
api.get("/equipos/:id", auth.verifyToken, equiposController.listarPorId);
api.post("/equipos/generar", auth.verifyToken, equiposController.crear);
// api.patch("/equipos/:id", auth.verifyToken, equiposController.update);
// api.delete("/equipos/:id", auth.verifyToken, equiposController.delete);


module.exports = api;
