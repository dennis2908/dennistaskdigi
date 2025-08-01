module.exports = app => {

  const products = require("../controllers/product.controller.js");

  var router = require("express").Router();

   router.post("", products.save);

  app.use("/api/products", router);
};
