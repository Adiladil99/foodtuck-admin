const upload = require("../../middleware/upload");

module.exports = function(app) {
  
  const authShop = require("../../controllers/client/auth.controller.js");

  var router = require("express").Router();

  // Create a new Product
  router.post("/login", upload.single(""), authShop.signin);
  router.post("/logout", upload.single(""), authShop.logout);
  router.post("/register", upload.single("image"), authShop.signup);

  app.use('/api/client/auth', router);

  // app.use(function(req, res, next) {
  //   res.header(
  //     "Access-Control-Allow-Headers",
  //     "x-access-token, Origin, Content-Type, Accept"
  //   );
  //   next();
  // });

  // app.post(
  //   "/api/merchant/auth/register", upload.single("shop_image"), 
  //   controller.signup
  // );

  
  // // [
  // //   verifySignUp.checkDuplicateUsernameOrEmail,
  // //   verifySignUp.checkRolesExisted
  // // ],

  // app.post("/api/merchant/auth/login", controller.signin);
};
