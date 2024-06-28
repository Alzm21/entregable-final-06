const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Cart = sequelize.define('cart', {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
    //productId -> We get it from req.user.id
    //userId -> We get it from req.user.id
});

module.exports = Cart;