const Client = require("../models/client.modules");
const catchAsync = require("../utils/catchASync");
const bcrypt =require('bcryptjs')
//const {token}=require('morgan')
const AppError = require("../utils/appError");
const { add } = require("winston");
//findall client

exports.findAllClient = catchAsync(async (req, res, next) => {
  
    
    const client = await Client.findAll({
      where: {
        
        status:'available'
      }
    });
    res.status(200).json({
      results: client.length,
      success: "ok",
      client,
    });
  
  
});

//create client

exports.createClient = catchAsync(async (req, res, next) => {
  const { name,  email,password,phone,address,city,} = req.body;

  const salt = await bcrypt.genSalt(12);
  const encryptedPassword = await bcrypt.hash(password, salt);
  const client = await Client.create({
    name,
    email,
    password:encryptedPassword,
    phone,
    address,
    city
  })
  res.status(200).json({
    status: "success",
    message: "Client created",
    client,
  })

  
});


exports.login = catchAsync(async (req, res, next) => {
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


//findOne client

exports.findOneClient = catchAsync(async (req, res, next) => {
  const {client } = req;
  res.status(200).json({
    status: "success",
    message: "client found",
    client,
  });
});
//Update client
exports.updateClient = catchAsync(async (req, res, next) => {
  const { client } = req;
  //const {name,email}=req.body
  res.status(200).json({
    status: "success",
    message: `Client with id:${client.id} updated`,
    client: {
      id: client.id,
      name: client.name,
      price: client.price,
      status: client.status,
    },
  });
});
//Delete client
exports.deleteClient = catchAsync(async (req, res, next) => {
  const { client } = req;
  await client.update({ status: "disable" });
  res.status(200).json({
    status: "success",
    message: `Client with id:${client.id} deleted`,
  });
});
