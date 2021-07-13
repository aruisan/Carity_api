const Router = require("express");
const api = new Router();
const personasController = require("../controllers/personas.controller");
const auth = require("../middlewares/auth");

api.get("/personas", auth.verifyToken, personasController.listar);
api.post("/personas/crear", auth.verifyToken, personasController.crear);
// api.get("/personas/:id", auth.verifyToken, equiposController.listarPorId);
// api.patch("/personas/:id", auth.verifyToken, equiposController.update);
// api.delete("/personas/:id", auth.verifyToken, equiposController.delete);


module.exports = api;
