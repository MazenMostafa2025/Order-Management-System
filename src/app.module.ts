import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrismaService } from './prisma/prisma.service';
import { CartController } from './cart/cart.controller';
import { CartModule } from './cart/cart.module';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';
import { OrderModule } from './order/order.module';
import { CartService } from './cart/cart.service';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [CartModule, OrderModule],
  controllers: [],
  providers: [],
})

export class AppModule {}