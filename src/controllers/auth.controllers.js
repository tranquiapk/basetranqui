const User =require('../models/users.models')
const catchAsync = require('../utils/catchASync')
const bcrypt =require('bcryptjs')
const generateJWT =require('../utils/jwt');
const AppError =require('../utils/appError')
const  {ref,uploadBytes,getDownloadURL}=require('@firebase/storage')
const {storage}=require('../utils/firebase')
exports.registro=catchAsync(async(req,res,next)=>{
    const {name,email,password,address,phone}=req.body
//insertar imagenes
   // const imgRef = ref(storage, `users/${Date.now()}-${req.file.originalname}`);
    //const imgUploaded = await uploadBytes(imgRef, req.file.buffer);
    const salt = await bcrypt.genSalt(12);
    const encryptedPassword = await bcrypt.hash(password, salt);
    
    //registro de usuario
    const user = await User.create({
        name: name.toLowerCase(),
        email: email.toLowerCase(),
        password: encryptedPassword,
        address,
        phone,
      });
      const token = await generateJWT(user.id);
      res.status(200).json({
        status: 'success',
        message: 'The user has been created',
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          address: user.address,
          phone: user.phone,
          role: user.role,
        },
      });
      
    
})

exports.logear = catchAsync(async (req, res, next) => {
    //1. traernos la informacion de la req.body
    const { email, password } = req.body;
  
    //2. buscar el usuario y revisar si existe
    const user = await User.findOne({
      where: {
        email: email.toLowerCase(),
        status: 'available',
      },
    })

    if (!user) {
        return next(new AppError(`User with email: ${email} not found`, 404));
      }
      //3. validar si la contraseña es correcta
    
      if (!(await bcrypt.compare(password, user.password))) {
        return next(new AppError(`Incorrect email or password`, 401));
      }
    
      //4. generar el token
      const token = await generateJWT(user.id);
    
      console.log(token);

      //5. enviar la respuesta al cliente

  res.status(200).json({
    status: 'success',
    token,
    user: {
        id: user.id,
        name: user.name,
        email: user.email,
        address: user.address,
        phone: user.phone,
        role: user.role,
    },
  });
});
exports.updatePassword = catchAsync(async (req, res, next) => {
    const { user } = req;
    const { currentPassword, newPassword } = req.body;
  
    if (!(await bcrypt.compare(currentPassword, user.password))) {
      return next(new AppError('Incorrect password', 401));
    }
  
    const salt = await bcrypt.genSalt(12);
    const encryptedPassword = await bcrypt.hash(newPassword, salt);
  
    await user.update({
      password: encryptedPassword,
      passwordChangedAt: new Date(),
    });
  
    return res.status(200).json({
      status: 'success',
      message: 'The user password was updated successfully',
    });
  });
  exports.renew = catchAsync(async (req, res, next) => {
    const { id } = req.sessionUser;
  
    const user = await User.findOne({
      where: {
        id,
        status: 'available',
      },
    });
  
    if (!user) {
      return next(new AppError('User not found', 404));
    }
  
    const token = await generateJWT(id);
  
    return res.status(200).json({
      status: 'success',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        address: user.address,
        phone: user.phone,
        role: user.role,
      },
    });
  });
  