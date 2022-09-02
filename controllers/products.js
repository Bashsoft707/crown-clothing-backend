const asyncHandler = require("../middleware/async");
const Product = require("../models/Product");
const ErrorResponse = require("../utils/errorResponse");
const cloudinary = require("../utils/cloudinary");
const Category = require("../models/Category");

exports.getProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({ success: true, count: products.length,data: products });
});

exports.getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(
      new ErrorResponse(`Product not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: product });
});

exports.createProduct = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.categoryId);

  if (!category) {
    return next(
      new ErrorResponse(
        `Category not found with id of ${req.params.categoryId}`,
        404
      )
    );
  }

  const uploadResult = await cloudinary.uploader.upload(req.file.path, {
    folder: "products",
  });

  const product = await Product.create({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    imageUrl: uploadResult.secure_url,
    cloudinary: uploadResult.public_id,
    category: req.params.categoryId,
  });

  res.status(201).json({ success: true, data: product });
});

exports.updateProduct = asyncHandler(async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(
        new ErrorResponse(`Product not found with id of ${req.params.id}`, 404)
      );
    }

    const r = await cloudinary.uploader.destroy(product.cloudinary);

    let uploadResult;
    if (req.file) {
      uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "products",
      });
    }

    await Product.findByIdAndUpdate(req.params.id, {
      $set: {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        imageUrl: uploadResult.secure_url,
        cloudinary: uploadResult.public_id,
      },
    });
    res.status(200).json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
});

exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return next(
      new ErrorResponse(`Product not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: {} });
});
