const User=require('../models/users.models')
const AppError=require('../utils/appError')
const catchAsync=require('../utils/catchASync')

exports.validUser=catchAsync(async(req,res,next)=>{
    const {id}=req.params
    const user=await User.findOne({
        where:{
            id,
            status:'available'
        }
    })
    if(!user){
        return next(new AppError(`User with id:${id} was not found...`,404))
     }
     req.user=user

     next()

})
