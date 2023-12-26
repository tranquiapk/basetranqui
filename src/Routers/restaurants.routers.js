const express=require('express')
const restaurantcontrollers=require('../controllers/restaurants.controllers')
const restaurantmiddleware=require('../middlewares/restaurants.middlewares')
const authMidleware=require('../middlewares/auth.middleware')

const routerA=express.Router()

routerA

.route('/')
.get(restaurantcontrollers.findAllRestaurant)
.post(authMidleware.protect,restaurantcontrollers.createRestaurant)
routerA.use(authMidleware.protect)
routerA
  .route('/:id')
  .get(restaurantmiddleware.validRestaurant,restaurantcontrollers.findOneRestaurant)
  .patch(restaurantcontrollers.updateRestaurant)
  .delete(restaurantcontrollers.deleteProduct)
  routerA
  .route('/:id/products')
  .get(restaurantcontrollers.findAllRestauranProducts)

module.exports=routerA