const express = require("express");
const {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products");
const upload = require("../utils/upload");

const productRouter = express.Router({ mergeParams: true });

productRouter
  .route("/")
  .get(getProducts)
  .post(upload.single("imageUrl"), createProduct);

productRouter
  .route("/:id")
  .get(getProduct)
  .put(upload.single("imageUrl"), updateProduct)
  .delete(deleteProduct);

module.exports = productRouter;
