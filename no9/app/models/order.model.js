module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      userId: Number,
      quantity : Number,
      productId:String,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Order = mongoose.model("orders", schema);
  return Order;
};
