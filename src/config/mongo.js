const mongoose = require("mongoose");

const ENV = process.env;

const url = `mongodb://${ENV.DB_HOST}:${ENV.DB_PORT}/${ENV.DB_NAME}`;

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

mongoose.connect(url, options)
    .then((db) => connected())
    .catch((err) => errorConnecting(err));

const connected = () => {
  console.log("DB is connected to: ", ENV.DB_NAME);
};

const errorConnecting = (err) => {
  console.log("=========================================");
  console.error("Failed to connect to mongo server: ", url);
  console.error("Probably mongod service is not running");
  console.log("Execute in console one of the following options");
  console.log("> service mongod restart");
  console.log("> mongod");
  console.log("> or try to start docker mongo");
  console.log("err:", err);
  console.log("=========================================");
};

module.exports = mongoose;
