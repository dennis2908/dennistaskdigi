module.exports = app => {

  console.log(11212)

  const Orders = require("../controllers/order.controller.js");

  var router = require("express").Router();

  // Create a new order
  router.post("/", Orders.create);

  // Retrieve all Orders
  router.get("/", Orders.findAll);

  // Retrieve all published Orders
  router.get("/published", Orders.findAllPublished);

  // Retrieve a single order with id
  router.get("/:id", Orders.findOne);

  // Update a order with id
  router.put("/:id", Orders.update);

  // Delete a order with id
  router.delete("/:id", Orders.delete);

  // Delete all Orders
  router.delete("/", Orders.deleteAll);

  app.use('/api/orders', router);
};
