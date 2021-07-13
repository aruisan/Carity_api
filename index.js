const http = require("http");
require("dotenv").config();
const app = require("./app");

const server = http.createServer(app);
const port = process.env.PORT || 3000;

global.mongoose = require("./src/config/mongo");

server.listen(port, ()=>{
  console.log("server liset on port:", port);
});
