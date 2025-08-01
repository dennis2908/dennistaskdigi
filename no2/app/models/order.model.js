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

module.exports = Order;
