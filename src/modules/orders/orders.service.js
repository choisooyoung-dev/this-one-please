import OrderRepository from './orders.repository.js';

export default class OrderService {
  orderRepository = new OrderRepository();

  createOrder = async (req, res, next) => {
    
  }

  getOrders = async (req, res, next) => {
  }

  updateState = async (req, res, next) => {
  }
}
