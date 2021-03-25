const { Router } = require('express');
const OrderService = require('../services/OrderService');
const Order = require('../models/Order');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const order = await OrderService.create(req.body);
      res.send(order);
    } catch (err) {
      next(err);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const orders = await Order.retrieve();
      res.send(orders);
    } catch (err) {
      next(err);
    }
  })

  .get('/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
      const order = await Order.retrieveById(id);
      res.send(order);
    } catch (err) {
      next(err);
    }
  })

  .put('/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
      const order = await OrderService.update(req.body, id);
      res.send(order);
    } catch (err) {
      next(err);
    }
  })

  .delete('/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
      const order = await OrderService.remove(id);
      res.send(order);
    } catch (err) {
      next(err);
    }
  });
