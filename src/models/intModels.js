const User =require('./users.models')
const Restaurant =require('./restaurants.models')
const Product =require('./products.models')

const intModels=()=>{
    User.hasMany(Restaurant,{foreignKey:"id_users"})
    Restaurant.belongsTo(User,{foreignKey:"id_users"})

    Restaurant.hasMany(Product,{foreignKey:"id_restaurants",sourceKey:"id"})
    Product.belongsTo(Restaurant,{foreignKey:"id_restaurants",targetKey:"id"})


}
module.exports= intModels