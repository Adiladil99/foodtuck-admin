const { authJwt } = require("../../middleware");
module.exports = app => {
  const authShop = require("../../controllers/client/auth.controller.js");
  app.get("/api/client/info", [authJwt.verifyToken], authShop.me);
};
