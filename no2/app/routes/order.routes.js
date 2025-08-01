module.exports = app => {

  console.log(11212)

  const Orders = require("../controllers/order.controller.js");

  var router = require("express").Router();

  // Create a new order
  router.post("/", Orders.create);

  app.use('/api/orders', router);
};
