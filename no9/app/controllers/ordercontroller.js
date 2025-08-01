const db = require("../models");

const Product = db.products;

const Order = db.orders;

const Shopping = db.shoppings;

const { MongoClient } = require('mongodb');

const client = new MongoClient(db.url);

// Create and Save a new Tutorial
exports.create = async (req, res) => {
  // Validate request

  await client.connect();

  const session = client.startSession(); 

  try {
  
  await session.withTransaction(async () => {
    
    productCheck = await Product.findById(req.body.produkId)

    shoppingCheck = await Shopping.find({ userId: req.body.userId, produkId:req.body.produkId })

    // console.log(1211, Object.keys(productCheck).length)
    // console.log(shoppingCheck.length)

      if (Object.keys(productCheck).length > 0 && shoppingCheck.length > 0 ) {

           await Product.updateOne({"_id":req.body.produkId}, {$set:{stock:productCheck.stock-req.body.quantity}});
            
            const orders = new Order({ 
                userId: req.body.userId,
                quantity : req.body.quantity,
                productId: req.body.productId
             })

             await orders.save(orders).catch(err => {
      res.status(500).send({
        message: "Could not save orders"
      });
    });
    await Shopping.deleteMany({ userId: req.body.userId, produkId:req.body.produkId }).then(data => {
      res.send({"success":true});
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the order."
      });
    });
  }
  else{
    res.status(500).send({
        message:"Some error occurred while creating the order."
      });
  }
        

  })

  } catch (error) {
   res.status(500).send({
        message: "Some error occurred while creating the order."
      });
  } 

  session.endSession();
  
};



