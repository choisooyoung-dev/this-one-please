import { Prisma } from '@prisma/client';
import { prisma } from '../../utils/prisma/index.js';

export default class OrderRepository {
  // createOrder = async (user_id,store_id,info) => {
  //     const order = await prisma.orders.create({
  //       data: {
  //         user_id:+user_id,
  //         store_id:+store_id,
  //         info
  //       }
  //     })

  //     async (tx) => {
  //       // 카트 내용

  //       // 토탈 가격

  //       // 
  //       await tx.userInfos.update({
  //         data: {
  //           ...updatedData
  //         },
  //         where: {
  //           UserId: userInfo.UserId,
  //         },
  //       });

  //     },
  //     {
  //       isolationLevel: Prisma.TransactionIsolationLevel.ReadCommitted,
  //     }

  //     return order;
  // }

  // getOrders = async (user_id) => {
  //   const orders = await prisma.cart.findMany({
  //     where:{user_id:+user_id},
  //     select:{
  //       info:true,
  //       Store : {
  //         select: {name:true}
  //       }
  //     }
  //   });

  //   return orders;
  // }
  
  // getStoreOrders = async (store_id) => {
  // }

  // updateState = async (req, res, next) => {
  // }
}
