const Order = require("../models/order.model.js");

// Create and Save a new Order
exports.create = (req, res) => {

  console.log(321123322)
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Order
  const order = new Order({
    produk_id: req.body.produk_id,
    nama_produk: req.body.nama_produk,
    harga: req.body.harga,
    kode_unik: req.body.kode_unik,
    status: req.body.status,
    tanggal: req.body.tanggal,
  });

  // Save Order in the database
  Order.create(order, (err, data) => {

    console.log(1312132231)

    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Order."
      });
    else res.send(data);
  });
};

// Retrieve all Orders from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  Order.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Orders."
      });
    else res.send(data);
  });
};

// Find a single Order by Id
exports.findOne = (req, res) => {
  Order.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Order with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Order with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all published Orders
exports.findAllPublished = (req, res) => {
  Order.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Orders."
      });
    else res.send(data);
  });
};

// Update a Order identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Order.updateById(
    req.params.id,
    new order(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Order with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Order with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Order with the specified id in the request
exports.delete = (req, res) => {
  Order.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Order with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Order with id " + req.params.id
        });
      }
    } else res.send({ message: `Order was deleted successfully!` });
  });
};

// Delete all Orders from the database.
exports.deleteAll = (req, res) => {
  Order.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Orders."
      });
    else res.send({ message: `All Orders were deleted successfully!` });
  });
};
