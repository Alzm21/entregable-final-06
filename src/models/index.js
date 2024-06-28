const Cart = require("./Cart");
const Category = require("./Category");
const Product = require("./Product");
const User = require("./User");

Product.belongsTo(Category)
Category.hasMany(Product)


//CART -> productId
Cart.belongsTo(Product)
Product.hasMany(Cart)

//CART -> UserId
Cart.belongsTo(User)
User.hasMany(Cart)
