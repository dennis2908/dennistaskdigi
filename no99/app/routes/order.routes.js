module.exports = app => {
  const orders = require("../controllers/ordercontroller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", orders.create);

  app.use("/api/orders", router);
};
