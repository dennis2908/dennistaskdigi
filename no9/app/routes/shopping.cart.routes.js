module.exports = app => {

  const shopping = require("../controllers/shopping.cart.controller.js");

  var router = require("express").Router();

   router.post("", shopping.save);

  app.use("/api/shopping", router);
};
