import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddToCartDto } from './dto/AddToCart.dto';
import { Prisma } from '@prisma/client';
import { UpdateCartDto } from './dto/UpdateCart.dto';
import { RemoveFromCartDto } from './dto/RemoveFromCart.dto';

@Injectable()
export class CartService {
    constructor(private prisma: PrismaService) {}

    async addToCart(addToCartDto: AddToCartDto) {
        const { userId, productId, quantity }: { userId: number, productId: number, quantity: number } = addToCartDto;
        let cart = await this.prisma.cart.findUnique({ where: { userId }});
        if (!cart)
           cart = await this.prisma.cart.create({ data: { userId } });
        const cartId = cart.cartId;
        const existingProduct = await this.prisma.cartProduct.findUnique({
            where: {
              cartId_productId: {
                cartId,
                productId
              }
            }, include: { product: true }
        });
  
        if (existingProduct)
        {
            if (existingProduct.quantity + quantity > existingProduct.product.stock) throw new HttpException('The quantity is greater than the stock', HttpStatus.BAD_REQUEST);

            return await this.prisma.cartProduct.update({
                where: { cartId_productId: { cartId, productId } },
                data: { quantity: existingProduct.quantity + quantity }
            });
        }
        
        const product = await this.prisma.product.findUnique({ where: { productId } });
        if (quantity > product.stock) throw new HttpException('The quantity is greater than the stock', HttpStatus.BAD_REQUEST);

        return await this.prisma.cartProduct.create({
            data: {
                 cartId,
                 productId, 
                 quantity
                 }
            });
    }

    async viewCart (userId: number) {
        const cart = await this.prisma.cart.findUnique({where: { userId }, include: { products: { select: { productId: true, quantity: true}} }});
        if (!cart) {
            await this.prisma.cart.create({ data: { userId } });
            throw new HttpException('the user has no items in the cart', HttpStatus.BAD_REQUEST);
        }
        const {products} = cart;
        return products;
    }

    async updateCart (updateCartDto: UpdateCartDto) {
        const { userId, productId, quantity }: { userId: number, productId: number, quantity: number } = updateCartDto;
        const cart = await this.prisma.cart.findUnique({where: { userId }});
        const cartId = cart.cartId
        const existingProduct = await this.prisma.cartProduct.findUnique({
            where: {
              cartId_productId: {
                cartId,
                productId
              }
            }, include: { product: true } 
          });
        
          
          if (existingProduct)
          {
              if (quantity > existingProduct.product.stock) throw new HttpException('The quantity is greater than the stock', HttpStatus.BAD_REQUEST);
              
              return await this.prisma.cartProduct.update({
                  where: { cartId_productId: { cartId, productId } },
                  data: { quantity }
                });
            }
        
        const product = await this.prisma.product.findUnique({ where: { productId } });
        if (quantity > product.stock) throw new HttpException('The quantity is greater than the stock', HttpStatus.BAD_REQUEST);
        return await this.prisma.cartProduct.create({
            data: {
                 cartId,
                 productId, 
                 quantity: quantity
                 }
            });
    }

    async removeFromCart (removeFromCartDto: RemoveFromCartDto) {
        const {userId, productId}: {userId: number, productId: number} = removeFromCartDto
        const cart = await this.prisma.cart.findUnique({ where: { userId } });
        const cartId = cart.cartId;
        await this.prisma.cartProduct.delete({ where: { cartId_productId: { cartId, productId } } });
    }
}
