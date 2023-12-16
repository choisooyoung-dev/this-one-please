import OrderService from './orders.service.js';

export default class OrderController {
    orderService = new OrderService();

    createOrder = async (req, res, next) => {
        const { store_id } = req.body;
        const user_id = res.locals.user.id;
        const order = await this.orderService.createOrder(user_id, store_id);
        return res.status(201).json({ success: true, data: order });
    };

    getOrder = async (req, res, next) => {
      const { id } = req.params;
      const order = await this.orderService.getOrder(id);
      return order;
    };

    getUserOrders = async (req, res, next) => {
        const user_id = res.locals.user.id;
        const orders = await this.orderService.getUserOrders(user_id);
        return res.status(201).json({ success: true, data: orders });
    };

    getStoreOrders = async (req, res, next) => {
        const store = res.locals.store;
        if (!store) {
            return res.status(404).json({ success: false, message: '권한이 없습니다.' });
        }
        const orders = await this.orderService.getUserOrders(store.id);
        return res.status(201).json({ success: true, data: orders });
    };

    updateState = async (req, res, next) => {
      const { id, state } = req.params;
      const store = res.locals.store;
        if (!store) {
            return res.status(404).json({ success: false, message: '권한이 없습니다.' });
        }
      const order = await this.orderService.getOrder(id);
      if(!order){
        return res.status(404).json({ success: false, message: '주문이 존재하지 않습니다.' });
      }
      
      if(store.id !== order.store_id) {
        return res.status(401).json({ success: false, message: '권한이 없습니다.' });
      }

      const updateOrder = await this.orderService.updateState(store.id,state);
      return res.status(201).json({ success: true, data: updateOrder , message:"상태 변경 되었습니다."});
    };

    deleteOrder = async (req, res, next) => {
      const store = res.locals.store;
      if (!store) {
          return res.status(401).json({ success: false, message: '권한이 없습니다.' });
      }
      const { id } = req.params;
      const order = await this.orderService.getOrder(id);
      if(!order){
        return res.status(404).json({ success: false, message: '주문이 존재하지 않습니다.' });
      }

      if(store.id !== order.store_id) {
        return res.status(401).json({ success: false, message: '권한이 없습니다.' });
      }

      if(order.state !== 0){
        return res.status(403).json({ success: false, message: '이미 주문이 시작 되었습니다.' });
      }

      await this.orderService.deleteOrder(id);
      return res.status(201).json({success:true, message:"삭제되었습니다."})
    };
}
