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

CategorySchema.pre("remove", async function (next) {
  await this.model("Product").deleteMany({ category: this._id });
  next();
});

CategorySchema.virtual("items", {
  ref: "Product",
  localField: "_id",
  foreignField: "Category",
  justOne: false,
});

module.exports = mongoose.model("Category", CategorySchema);
