module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      userId:Number,
      quantity : Number,
      produkId:String,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Shopping = mongoose.model("shopping_carts", schema);
  return Shopping;
};
