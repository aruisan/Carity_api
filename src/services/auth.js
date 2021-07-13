const jwt = require("jwt-simple");
const moment = require("moment");
const bcrypt = require("bcrypt");
const auth = {};
const ENV = process.env;

auth.hashPassword = async (password) => {
  const encrypted = await bcrypt.hash(password, 10);
  return encrypted;
};
auth.createToken = (usuario) => {
  const payload = {
    sub: (usuario._id).toString(),
    iat: moment().unix(),
    exp: moment().add(2, "hours").unix(),
  };
  return jwt.encode(payload, ENV.SECRET_TOKEN);
};

auth.decodeToken = (token) => {
  return new Promise((resolve, reject) => {
    try {
      const payload = jwt.decode(token, ENV.SECRET_TOKEN);
      resolve(payload.sub);
    } catch (e) {
      throw new Error(e);
    }
  });
};

module.exports = auth;
