const upload = require("../../middleware/upload");
const { authJwt } = require("../../middleware");
const router = require("express").Router();

module.exports = app => {
  const cart = require("../../controllers/client/callform.controller.js");

  // Create a new Product
  router.post("/", upload.single(''), cart.create);

  app.use('/api/callform', router);
};
