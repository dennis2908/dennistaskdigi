const db = require("../models");

const Product = db.products;

const { MongoClient } = require('mongodb');

const client = new MongoClient(db.url);

exports.save = async (req, res) => {
  // Validate request

  await client.connect();

  const session = client.startSession(); 
  

  try {

  
  await session.withTransaction(async () => {
    

  const products = new Product({
      name: req.body.name,
      stock : req.body.stock
  });

  // Save Tutorial in the database
  products
    .save(products).then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
     });

  } catch (error) {
    console.error('❌ simpan gagal:', error.message);
  } 

  session.endSession();
  
};