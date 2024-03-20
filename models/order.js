const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderItemSchema = new Schema({
  productId: { type: String, required: true },
  productQuantity: { type: Number, required: true },
  productDR: { type: Number, required: true },
  productMRP: { type: Number, required: true },
  productName: { type: String, required: true },
})

const orderSchema = new Schema(
  {
    orderStatus: {
      type: Number,
      default: 0,
      validate: {
        validator: function (v) {
          return v >= 0 && v <= 9
        },
        message: 'Order status must be a number in the range of 0 to 9',
      },
    },
    orderType: { type: String, enum: ['BUY', 'DONATE'] },
    orderItems: [{ type: orderItemSchema, required: true }],
    orderPlacedBy: { type: String, required: true },
    orderDeliveryAddress: { type: String, required: true },
    orderContactNumber: [{ type: String, required: true }],
  },
  {
    timestamps: true,
  },
)

const OrderTable = mongoose.model('Orders', orderSchema)

module.exports = {
  createData: function (inputData) {
    console.log(inputData)
    return new Promise((resolve, reject) => {

      const orderData = new OrderTable(inputData)
      orderData
        .save()
        .then((data) => resolve(data))
        .catch((err) => reject(err))
    })
  },
  getAllData: function () {
    return OrderTable.find({}).sort({ createdAt: 1 }).exec()
  },
}
