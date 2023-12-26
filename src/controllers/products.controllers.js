const Product = require("../models/products.models");
const Restaurant = require("../models/restaurants.models");
const catchAsync = require("../utils/catchASync");
const { storage } = require("../utils/firebase");
const { ref, getDownloadURL, uploadBytes } = require("firebase/storage");
const AppError = require("../utils/appError");
const { add } = require("winston");
const upload = require("../utils/multer");
//const product =require('../middlewares/products.middlewares')

//findall

exports.findAllProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findAll({
    where: {
     
      status: "available",
    },
  });
  res.status(200).json({
    results: product.length,
    success: "ok",
    product,
  });
});
//create users
exports.createProduct = catchAsync(async (req, res, next) => {
  const {name, description, price, image,id_restaurants } = req.body;
  
 
    console.table(req.body);
    console.log("###############################");
    console.table(req.file);
    {
      /*const file = fs.readFileSync('image.jpg')

storage.ref('images/my-image.jpg').put(file, {
contentType: 'image/jpeg'
});
*/
    }
    /* const imgRef=  ref(storage,`products/${ Date.now()}`)
   const imageUpload=await uploadBytes(imgRef,'png' )
 */

    const product = await Product.create({
      name,
      description,
      price,
      image,
      id_restaurants,
    });
    res.status(200).json({
      status: "success",
      message: "products created",
      product,
    });
   // next();
 
});

//findOne Product

exports.findOneProduct = catchAsync(async (req, res, next) => {
  const { product } = req;
  res.status(200).json({
    status: "success",
    message: "Product found",
    product,
  });
});
//Update Product
exports.updateProduct = catchAsync(async (req, res, next) => {
  const { product } = req;
  //const {name,email}=req.body
  res.status(200).json({
    status: "success",
    message: `Product with id:${product.id} updated`,
    product: {
      id: product.id,
      id_restaurants: product.id_restaurants,
      name: product.name,
      description: product.description,
      price: product.price,
    },
  });
});
//Delete Product
exports.deleteProduct = catchAsync(async (req, res, next) => {
  try {
    const { product } = req;

    const { id } = req.params;
    await product.update({ status: "disable" });
    res.status(200).json({
      status: "success",
      message: `Product with deleted:${id}`,
    });
  } catch (error) {
    console.log(error);
  }
});
