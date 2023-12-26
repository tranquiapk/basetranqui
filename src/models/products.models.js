const {DataTypes}=require('sequelize')
const {db}=require('../Database/bd.config')

const Product=db.define('products',{

id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true,
    allowNull:false

},
id_restaurants:{
    type:DataTypes.INTEGER,
    allowNull:false
},

name:{
    type:DataTypes.STRING,
    allowNull:false
},

description:{
    type:DataTypes.TEXT,
    allowNull:false
},

price:{

    type:DataTypes.FLOAT,
    allowNull:false
},
image:{
    type:DataTypes.TEXT,
    allowNull:false,
    },
status:{
    type:DataTypes.ENUM('available','disable'),
    allowNull:false,
    defaultValue:'available'
},




})
module.exports=Product