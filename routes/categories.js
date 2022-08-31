const express = require("express");
const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categories");
const productRouter = require("./products");

const categoryRouter = express.Router();

categoryRouter.use("/:categoryId/products", productRouter);

categoryRouter.route("/").get(getCategories).post(createCategory);

categoryRouter
  .route("/:id")
  .get(getCategory)
  .put(updateCategory)
  .delete(deleteCategory);

module.exports = categoryRouter;
