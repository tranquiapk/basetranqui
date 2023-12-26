const {DataTypes}=require("sequelize")
const {db}=require('../Database/bd.config')

const Restaurant=db.define('restaurants',{
    id:{

        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
   
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    ruc:{
        type:DataTypes.STRING,
        allowNull:false
    },
    address:{

        type:DataTypes.STRING,
        allowNull:false
    },
    phone:{
        type:DataTypes.STRING,
        allowNull:false
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false
    },
    storeImg:{
        type:DataTypes.STRING,
        allowNull:false
    },
    id_users:{

        type:DataTypes.INTEGER,
        allowNull:false
    },
    type:{
        type:DataTypes.ENUM('Restaurante','Farmacia','Tienda','Supermercado'),
        allowNull:false,
        defaultValue:'Restaurante'
    },
    status:{
        type:DataTypes.ENUM('available','disable'),
        allowNull:false,
        defaultValue:'available'
    },
   
})
module.exports=Restaurant