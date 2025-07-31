const sql = require("./db.js");

// constructor

var todayDate = new Date().toISOString().slice(0, 10);
// console.log(todayDate);
const Order = function(Order) {
  this.produk_id = Order.produk_id;
  this.nama_produk = Order.nama_produk;
  this.harga = 299000;
  this.kode_unik = new Date().getUTCMilliseconds();
  this.status = Order.status;
  this.tanggal = todayDate;
};

Order.create = (newOrder, result) => {
  sql.query("INSERT INTO orders SET ?", newOrder, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Order: ", { id: res.insertId, ...newOrder });
    result(null, { id: res.insertId, ...newOrder });
  });
};

Order.findById = (id, result) => {
  sql.query(`SELECT * FROM order WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Order: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Order with the id
    result({ kind: "not_found" }, null);
  });
};

Order.getAll = (title, result) => {
  let query = "SELECT * FROM order";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("order: ", res);
    result(null, res);
  });
};

Order.getAllPublished = result => {
  sql.query("SELECT * FROM order WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("order: ", res);
    result(null, res);
  });
};

Order.updateById = (id, Order, result) => {
  sql.query(
    "UPDATE order SET title = ?, description = ?, published = ? WHERE id = ?",
    [Order.title, Order.description, Order.published, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Order with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Order: ", { id: id, ...Order });
      result(null, { id: id, ...Order });
    }
  );
};

Order.remove = (id, result) => {
  sql.query("DELETE FROM order WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Order with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Order with id: ", id);
    result(null, res);
  });
};

Order.removeAll = result => {
  sql.query("DELETE FROM order", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} order`);
    result(null, res);
  });
};

module.exports = Order;
