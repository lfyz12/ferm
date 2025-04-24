const sequelize = require('../db')
const { DataTypes } = require('sequelize')

//Описание таблиц

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: true, defaultValue: "Гость" },
    number: { type: DataTypes.STRING, allowNull: false, unique: true },
    defaultAddress: { type: DataTypes.STRING, allowNull: true, defaultValue: "" },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, allowNull: false, defaultValue: "USER" },
    isActivated: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    activatedCode: { type: DataTypes.STRING, allowNull: false, defaultValue: '' }
})

const Token = sequelize.define('token', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    refreshToken: { type: DataTypes.TEXT, allowNull: false }
})

const Basket = sequelize.define('basket', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    aproxSum: { type: DataTypes.DOUBLE, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false, unique: true }
})

const BasketProduct = sequelize.define('basketProduct', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    basketId: { type: DataTypes.INTEGER, allowNull: false },
    assortmentId: { type: DataTypes.INTEGER, allowNull: false },
    count: { type: DataTypes.DOUBLE, allowNull: false },
    moreOrLess: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    costPerOne: { type: DataTypes.DOUBLE, allowNull: true },
    name: { type: DataTypes.STRING, allowNull: true },
    image: { type: DataTypes.STRING, allowNull: true }
})

const Order = sequelize.define('order', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false, defaultValue: "" },
    aproxSum: { type: DataTypes.DOUBLE, allowNull: false },
    onConfirm: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    onCreate: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    onDeliver: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    delivered: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    canceled: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
    orderProductsCount: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    comment: { type: DataTypes.TEXT, allowNull: false, defaultValue: 0 },
    number: { type: DataTypes.STRING, allowNull: false, defaultValue: 0 }
})

const ComplitedOrders = sequelize.define('complitedOrders', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false },
    complitedSum: { type: DataTypes.DOUBLE, allowNull: false },
    orderTime: { type: DataTypes.DATE, allowNull: false },
    complitedTime: { type: DataTypes.DATE, allowNull: false }
})

const OrderProduct = sequelize.define('orderProduct', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    orderId: { type: DataTypes.INTEGER, allowNull: false },
    assortmentId: { type: DataTypes.INTEGER, allowNull: false },
    count: { type: DataTypes.DOUBLE, allowNull: false },
    moreOrLess: { type: DataTypes.BOOLEAN, allowNull: false }
})

const ComplitedOrderProduct = sequelize.define('complitedOrderProduct', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    complitedOrderId: { type: DataTypes.INTEGER, allowNull: false },
    assortmentId: { type: DataTypes.INTEGER, allowNull: false },
    count: { type: DataTypes.DOUBLE, allowNull: false }
})

const Assortment = sequelize.define('assortment', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    type: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    available: { type: DataTypes.BOOLEAN, allowNull: false },
    costPerOne: { type: DataTypes.DOUBLE, allowNull: false },
    unitsOfMeasurement: {type: DataTypes.STRING, allowNull: true},
    composition: { type: DataTypes.TEXT, allowNull: true },
    image: { type: DataTypes.STRING, allowNull: true }
})

const Feedback = sequelize.define('feedback', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    typeOfFeedback: { type: DataTypes.STRING, allowNull: false },
    userEmail: { type: DataTypes.STRING, allowNull: false },
    userFIO: { type: DataTypes.STRING, allowNull: false },
    feedbackMessage: { type: DataTypes.TEXT, allowNull: false }
})


//Описание связей
User.hasOne(Basket)
Basket.belongsTo(User)

User.hasOne(Token)
Token.belongsTo(User)

Basket.hasMany(BasketProduct)
BasketProduct.belongsTo(Basket)

User.hasMany(Order)
Order.belongsTo(User)

Order.hasMany(OrderProduct)
OrderProduct.belongsTo(Order)

Assortment.hasMany(BasketProduct)
BasketProduct.belongsTo(Assortment)

Assortment.hasMany(OrderProduct)
OrderProduct.belongsTo(Assortment)

User.hasMany(ComplitedOrders)
ComplitedOrders.belongsTo(User)

ComplitedOrders.hasMany(ComplitedOrderProduct)
ComplitedOrderProduct.belongsTo(ComplitedOrders)

module.exports = {
    User, Token, Basket, 
    BasketProduct, Order, OrderProduct,
    Assortment, ComplitedOrders, 
    ComplitedOrderProduct, Feedback
}
