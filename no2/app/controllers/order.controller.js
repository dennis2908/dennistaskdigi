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

    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Order."
      });
    else res.send(data);
  });
};
