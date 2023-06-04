const upload = require("../middleware/upload");
const { authJwt } = require("../middleware");
module.exports = function(app) {
  
  const order = require("../controllers/order_tables.controller.js");

  var router = require("express").Router();

  router.post("/", upload.single(''),  [authJwt.verifyToken], order.create);
  router.get("/", [authJwt.verifyToken], order.findAll);

  app.use('/api/table', router);
};
