const upload = require("../middleware/upload");

module.exports = function(app) {
  
  const getters = require("../controllers/getters.controller.js");

  var router = require("express").Router();

  router.get("/discounts", upload.single(""), getters.discounts);
  router.get("/tables", upload.single(""), getters.tables);
  router.get("/categories", upload.single(""), getters.categories);
  router.get("/search", upload.single(""), getters.search);
  // router.post("/", upload.single(""), authShop.logout);

  app.use('/api/get', router);
};
