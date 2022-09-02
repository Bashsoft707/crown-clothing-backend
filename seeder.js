const fs = require("fs");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const Category = require("./models/Category");
const Product = require("./models/Product");

dotenv.config({ path: "./config/config.env" });

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const categories = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/categories.json`, "utf8")
);
const products = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/products.json`, "utf8")
);

const importData = async () => {
  try {
    await Category.create(categories);
    await Product.create(products);
    console.log("Data successfully imported!");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

const deleteData = async () => {
  try {
    await Category.deleteMany();
    await Product.deleteMany();
    console.log("Data successfully deleted!");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
