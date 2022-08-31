const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

CategorySchema.virtual("products", {
  ref: "Product",
  localField: "_id",
  foreignField: "Category",
  justOne: false,
});

module.exports = mongoose.model("Category", CategorySchema);
