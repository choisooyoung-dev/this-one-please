import OrderRepository from './orders.repository.js';

export default class OrderService {
  orderRepository = new OrderRepository();

  createOrder = async (user_id, store_id) => {
      const data = await this.orderRepository.createOrder(user_id, store_id);
      return data;
  }

  getOrder = async (id) =>{
    const order = await this.orderRepository.getOrder(id);
    return order;
  }

  getUserOrders = async (user_id) => {
    const orders = await this.orderRepository.getUserOrders(user_id);
    return orders.map((order) => {
      return {
          id: order.id,
          user_id: order.user_id,
          store_id: order.store_id,
          price: order.price,
          info: order.info,
          store_name: order.Store?.name,
          created_at: order.created_at,
          updated_at: order.updated_at,
      };
  });
  }

  getStoreOrders = async (store_id) => {
    const orders = await this.orderRepository.getStoreOrders(store_id);
    return orders.map((order) => {
      return {
          id: order.id,
          user_id: order.user_id,
          store_id: order.store_id,
          price: order.price,
          info: order.info,
          user_name: order.User?.name,
          created_at: order.created_at,
          updated_at: order.updated_at,
      };
  });
  }

  updateState = async (id,state) => {
    const order = await this.orderRepository.updateState(id,state);
      return order;
  }

  deleteOrder = async (id) => {
    const data = await this.orderRepository.deleteOrder(id);
      return data;
  }
}
