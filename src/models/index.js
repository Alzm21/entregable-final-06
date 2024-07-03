const Cart = require("./Cart");
const Category = require("./Category");
const Product = require("./Product");
const ProductImg = require("./ProductImg");
const Purchase = require("./Purchase");
const User = require("./User");

Product.belongsTo(Category)
Category.hasMany(Product)


//CART -> productId
Cart.belongsTo(Product)
Product.hasMany(Cart)

//CART -> UserId
Cart.belongsTo(User)
User.hasMany(Cart)

//PURCHASE -> productId
Purchase.belongsTo(Product)
Product.hasMany(Purchase)

//PURCHASE -> UserId
Purchase.belongsTo(User)
User.hasMany(Purchase)

//ProductImg -> ProductId
ProductImg.belongsTo(Product)
Product.hasMany(ProductImg)