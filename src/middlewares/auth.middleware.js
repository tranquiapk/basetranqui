const AppError = require("../utils/appError");
const { promisify, } = require("util");
const catchAsync = require("../utils/catchASync");
const jwt = require("jsonwebtoken");
const User = require("../models/users.models");

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }
  console.log(req.headers.authorization)
  if (!token) {
    
    return next(new AppError("You have not logged in ...!!, please log in to get access",401 ));
  }
  
  const decoded = await promisify(jwt.verify)(
    token,
    process.env.SECRET_JWT_SEED
  );
  console.log(decoded)
  const user = await User.findOne({
    where: {
      id: decoded.id,
      status: "available",
    },
  });

  if (!user) {
    return next(
      new AppError(
        "You have not logged in...!!, please log in to get access",
        401
      )
    );
  }

  if (user.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      user.passwordChangedAt.getTime() / 1000,
      10
    );

    if (decoded.iat < changedTimeStamp) {
      return next(
        new AppError(
          "User recently changed password!, please login again.",
          401
        )
      );
    }
  }

  req.sessionUser = user;
 
  next();
});

exports.protectAccountOwner = catchAsync(async (req, res, next) => {
  const { user, sessionUser } = req;

  if (user.id !== sessionUser.id) {
    return next(new AppError("You do not own this account.", 401));
  }

  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.sessionUser.role)) {
      return next(
        new AppError("You do not have permission to perform this action!", 403)
      );
    }

    next();
  };
};

/*exports.protectAccoumtOwner=catchAsync(async(req,res,next)=>{
    const {users,sessionUser}=req
    if(users.id!==sessionUser.id){
        return next(new AppError('You have not logged in...!!, please log in to get access',401)
        )
    }


})
*/
