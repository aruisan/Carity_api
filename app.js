const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const call = require("./src/services/call");

app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));
app.use(morgan("dev"));
app.use(cors());
app.set("json spaces", 4);

call.routes(app, "/v1", "/routes");

app.all("*", (req, res) => {
  res.status(404).json({
    success: false,
    data: {
      message: "¿Estas perdido?, ¿Necesitas ayuda?",
    },
  });
});

module.exports = app;
