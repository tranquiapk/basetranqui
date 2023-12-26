
const Restaurant = require("../models/restaurants.models");
const User =require('../models/users.models')
const catchAsync = require("../utils/catchASync");


//const {token}=require('morgan')
const AppError = require("../utils/appError");
const { add } = require("winston");
const Product = require("../models/products.models");
//findall

exports.findAllRestaurant = catchAsync(async (req, res, next) => {
  const restaurant = await Restaurant.findAll({
    where: {
     
      status: "available"
    },
    attributes:
    {
exclude:["id_users"]
    },
    include:{
      model:User
    }
   
  });
  res.status(200).json({
    results: restaurant.length,
    success: "ok",
    restaurant,
  });
}); 

exports.findAllRestauranProducts = catchAsync(async (req, res, next) => {
  const{id}=req.params

  const restProduct = await Product.findAll({
    where: {
      id_restaurants:id,
     
      status: "available"
    },
    
   
  });
  res.status(200).json({
    results: restProduct.length,
    success: "ok",
    restProduct,
  });
}); 

//create Restaurants
exports.createRestaurant = catchAsync(async (req, res, next) => {
  
  const { 
    
    name,
    ruc,
    address,
    phone,
    description,
    storeImg
    } = req.body;
    const {id}=req.sessionUser;
    
try {
  const restaurant = await Restaurant.create({
   
    name:name,
    ruc:ruc,
    address:address,
    phone:phone,
    description:description,
    storeImg:storeImg,
    id_users:id,
      })
      
  res.status(200).json({
    status: "success",
    message: "Restaurant created",
    restaurant,
  })

} catch (error) {
 console.log(error) 
}
    
  
});

//findOne Restaurant

exports.findOneRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;
  res.status(200).json({
    status: "success",
    message: "Restaurant found",
    restaurant,
  });
});
//Update Restaurant
exports.updateRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;
  //const {name,email}=req.body
  res.status(200).json({
    status: "success",
    message: `Restaurant with id:${restaurant.id} updated`,
    restaurant: {
        id: restaurant.id,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        description: req.body.description,
        type: req.body.type,
  
    },
  });
});
//Delete restaurant
exports.deleteProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const restaurant=await Restaurant.destroy({ 
    where:{
      id,
    }
   });
  res.status(200).json({
    status: "success",
    message: `Restaurant with id:${restaurant.id} deleted`,
  });
});
