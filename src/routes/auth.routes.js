const Router = require("express");
const api = new Router();
const authController = require("../controllers/auth.controller");

api.post("/auth/signin", authController.signin);
// api.post("/auth/signup", authController.signup);

module.exports = api;
