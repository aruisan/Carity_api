const path = require("path");
const fs = require("fs");
const call = {};

call.routes = (app, rest, folder, omit=[""]) => {
  const dir = path.join(__dirname, "..", folder);
  const files = fs.readdirSync(dir);
  for (let i = files.length - 1; i >= 0; i--) {
    if (files[i].split(".js").length != 1) {
      if (omit.indexOf(files[i]) == -1) {
        const route = require(`${dir}/${files[i]}`);
        app.use(rest, route);
      }
    }
  }
};

module.exports = call;
