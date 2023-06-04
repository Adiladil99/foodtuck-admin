const upload = require("../middleware/upload");

module.exports = function(app) {
  
  const product = require("../controllers/product.controller.js");

  var router = require("express").Router();

  router.get("/", upload.single(""), product.getProducts);
  router.get("/slug", upload.single(""), product.getProductBySlug);

  app.use('/api/products', router);
};
