const Router = require("express");
const api = new Router();
const manualesController = require("../controllers/manual.controller");
const auth = require("../middlewares/auth");

api.get("/manuales", manualesController.listar);
api.post("/manuales/crear", manualesController.crear);


module.exports = api;
