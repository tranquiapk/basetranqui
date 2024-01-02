const Client = require("../models/client.modules");
const catchAsync = require("../utils/catchASync");
const bcrypt =require('bcryptjs')
const generateJWT =require('../utils/jwt');
const AppError =require('../utils/appError')
const validetClient =require("../middlewares/clients.middlewares")
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

//*login de cliente 
exports.login = catchAsync(async (req, res, next) => {
  //1. traernos la informacion de la req.body
  
  const { email,password } = req.body;

  const client = await Client.findOne({
    where: {
      
      email: email.toLowerCase(),
      status: 'available',
    },
  })
  
  if (!email) {
    return next(new AppError(`User with email: ${email} not found`, 404));
  }
  //3. validar si la contraseña es correcta
  
 
    if (!(await bcrypt.compare(password, client.password))) {
      return next(new AppError(`Incorrect email or password`, 401));
    }
  
    //4. generar el token
   
    //5. enviar la respuesta al cliente

res.status(200).json({
  status: 'success',

  client: {
      id: client.id,
      name: client.name,
      email: client.email,
      address: client.address,
      phone: client.phone,
      city: client.city,
  },
});
});


//findOne client

exports.findOneClient = catchAsync(async (req, res, next) => {
  const {id} = req.params;
  const client=await Client.findOne({
    where:{
      id,
    }
  })
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
      email: client.email,
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
