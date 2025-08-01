const db = require("../models");

const Shopping = db.shoppings;

const { MongoClient } = require('mongodb');

const client = new MongoClient(db.url);

exports.save = async (req, res) => {
  // Validate request

  await client.connect();

  const session = client.startSession(); 
  

  try {

  
  await session.withTransaction(async () => {
    

  const shopping = new Shopping({
      userId: req.body.userId,
      produkId : req.body.produkId,
      quantity : req.body.quantity

  });

  // Save Tutorial in the database
  shopping
    .save(shopping).then(data => {
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