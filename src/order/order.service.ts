import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { OrderStatus, Prisma } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
    constructor(private prisma: PrismaService){}

    async createOrder (userId: number) {
        return this.prisma.$transaction(async (prisma) => {
            const userCart = await this.prisma.cart.findUnique({ where: { userId }, include: { products: { include: { product: true } } } } );

            if (!userCart || userCart.products.length === 0) throw new HttpException('user cart is empty', HttpStatus.BAD_REQUEST);

            let orderTotal = new Decimal(0);
            
            const orderProducts = userCart.products.map(cartProduct => {
              const total = cartProduct.product.price.mul(cartProduct.quantity);
              orderTotal = orderTotal.add(total);
              return {
                productId: cartProduct.productId,
                quantity: cartProduct.quantity,
                total: total,
              };
            });
    
            const cartProducts = await this.prisma.cartProduct.findMany( { where: { cartId: userCart.cartId }, include: { product: true } });
            const order = await this.prisma.order.create({
                data: {
                    userId: userId,
                    status: "PENDING",
                    total: orderTotal,
                    orderDate: new Date(),
                    products: { create: orderProducts }
                }
            })
    
            for (const cartProduct of userCart.products) {
                await this.prisma.product.update({
                  where: { productId: cartProduct.productId },
                  data: { stock: { decrement: cartProduct.quantity } },
                });
              }
            
              await this.prisma.cartProduct.deleteMany({
                where: { cartId: userCart.cartId }
            });
            return order;
        })
    }

    async getOrderById (orderId: number) {
        const order = await this.prisma.order.findUnique({ where: { orderId } });
        if (!order) throw new HttpException('order with this id does not exist', HttpStatus.NOT_FOUND);
        return order;
    }

    async UpdateOrderStatus (orderId: number, status: string) {
        status = status.toUpperCase();
        if (!this.isValidOrderStatus(status)) throw new HttpException(`Invalid order status: ${status},
         please enter one of the following: PENDING-PROCESSING-SHIPPED-DELIVERED-CANCELLED`, HttpStatus.BAD_REQUEST);
        return await this.prisma.order.update({ where: { orderId }, data: { status: status } });
    }
    private isValidOrderStatus(status: string): status is OrderStatus {
        return Object.values(OrderStatus).includes(status as OrderStatus);
      }

}