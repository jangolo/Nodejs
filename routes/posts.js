const router = require("express").Router();
const verify = require("./verifyToken");
const User = require("../models/User");
const Product = require("../models/Product");

router.get("/", verify, async (req, res) => {
  const user = await User.findOne({ _id: req.user });
  res.send(user);
});

// Store Product
router.post("/product", verify, async (req, res) => {
  const newProduct = new Product({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    rating: req.body.rating,
  });

  try {
    const productSave = await newProduct.save();
    res.send(productSave);
    //res.send({productSave : productSave._id})
  } catch (err) {
    res.status(400).send(err);
  }
  // newProduct
  //   .save()
  //   .then((response) => {
  //     res.send(response);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //     res.status(400).send(error);
  //   });
});

//how all product
router.get("/product", (req, res) => {
  Product.find((err, products) => {
    res.send(products);
  });
});

// Show product by id
router.get("/product/:id", (req, res) => {
  Product.findById(req.params.id, (err, product) => {
    res.send(product);
  });
});

// Delete product
router.delete("/product/:id", verify, (req, res) => {
  Product.remove(
    (req.params.id,
    (err, product) => {
      res.send("Product deleted");
    })
  );
});

// Updating Product
router.post("/product/:id", verify, (req, res) => {
  let product = {};
  if (req.body.title) product.title = req.body.title;
  if (req.body.description) product.description = req.body.description;
  if (req.body.price) product.price = req.body.price;
  if (req.body.rating) product.rating = req.body.rating;
  product = { $set: product };
  Product.update({ _id: req.params.id }, product)
    .then(() => {
      res.send(product);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
