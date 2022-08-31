const fs = require("fs");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const Category = require("./models/Category");

dotenv.config({ path: "./config/config.env" });

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const categories = JSON.parse(
  fs.readFileSync(`${__dirname}/data/categories.json`, "utf8")
);

const importData = async () => {
  try {
    await Category.create(categories);
    console.log("Data successfully imported!");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

const deleteData = async () => {
  try {
    await Category.deleteMany();
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
