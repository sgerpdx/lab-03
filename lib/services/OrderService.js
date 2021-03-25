const Order = require('../models/Order');
const { sendSms } = require('../utils/twilio');

module.exports = class OrderService {
  static async create({ quantity }) {
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `New Order received for ${quantity}`
    );

    const order = await Order.insert({ quantity });

    return order;
  }

  static async update({ quantity }, id) {
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `Order # ${id} has been updated`
    );

    const order = await Order.adjust({ quantity }, id);

    return order;
  }

  static async remove(id) {
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `Order # ${id} has been deleted`
    );

    const order = await Order.deleteById(id);

    return order;
  }
};
