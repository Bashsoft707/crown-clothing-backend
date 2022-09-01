const asyncHandler = require("../middleware/async");
const Category = require("../models/Category");
const ErrorResponse = require("../utils/errorResponse");

exports.getCategories = asyncHandler(async (req, res, next) => {
  const categories = await Category.find().populate("items");

  res.status(200).json({ success: true, data: categories });
});

exports.getCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id).populate("items");

  if (!category) {
    return next(
      new ErrorResponse(`Category not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: category });
});

exports.createCategory = asyncHandler(async (req, res, next) => {
  const { title } = req.body;

  if (!title) {
    return next(new ErrorResponse(`Please provide all fields`, 400));
  }

  const category = await Category.create({
    title: req.body.title,
  });

  res.status(201).json({ success: true, data: category });
});

exports.updateCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!category) {
    return next(
      new ErrorResponse(`Category not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: category });
});

exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(
      new ErrorResponse(`Category not found with id of ${req.params.id}`, 404)
    );
  }

  await category.remove();

  res.status(200).json({ success: true, data: {} });
});
