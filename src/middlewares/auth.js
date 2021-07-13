const middleware = {};
const authService = require("./../services/auth");

middleware.verifyToken = async (req, res, next) => {
  const {authorization} = req.headers;
  const token = authorization.split(" ")[1];
  console.log(token)
  if (token == undefined || token == null || token == "") {
    res.status(404).send({
      success: false,
      message: "Error verify your data",
    });
  } else {
    await authService.decodeToken(token).then(async (tokenJwt) => {
      req["usuario"] = {
        userId: tokenJwt,
      };
      next();
    }).catch((err)=>{
      res.status(500).send({
        success: false,
        message: err.message,
      });
    });
  }
};

module.exports = middleware;
