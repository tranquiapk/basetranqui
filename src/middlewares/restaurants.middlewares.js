const Restaurant = require('../models/restaurants.models')
const User =require('../models/users.models')
const AppError=require('../utils/appError')
const catchAsync=require('../utils/catchASync')


exports.validRestaurant=catchAsync(async(req,res,next)=>{
    const {id}=req.params
    console.log("khkjhkj",req.body)
   const restaurant=await Restaurant.findOne({
        where:{
            id,

            status:'available'
        },
       
       
    })
    if(!restaurant){
        return next(new AppError(`Restaurant with id:${id} was not found...`,404))
     }
     req.restaurant=restaurant
     req.user=restaurant.user

    next()

})