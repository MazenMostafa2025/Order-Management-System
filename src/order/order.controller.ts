import { Controller, Get, Post, Put, Delete, Body, Param, HttpException, HttpStatus, ValidationPipe, UsePipes, ParseIntPipe } from '@nestjs/common';
import { OrderService } from './order.service';
import { Prisma } from '@prisma/client';
import { CreateOrderDto } from './dto/CreateOrder.dto';
import { UpdateOrderStatusDto } from './dto/UpdateOrderStatus.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Order } from './entities/order.entity';

@ApiTags('order')
@Controller('order')
export class OrderController {

    constructor(private orderService: OrderService) {}
    @UsePipes(ValidationPipe)

    @ApiOperation({ summary: 'Create an order' })
    @ApiCreatedResponse({type: Order, description: 'Order successfully created'})
    @ApiBadRequestResponse({ description: 'Invalid order status. Please enter one of the following: PENDING-PROCESSING-SHIPPED-DELIVERED-CANCELLED'})
    @Post()
    createOrder (@Body() createOrderDto: CreateOrderDto): Promise<Order> {
        return this.orderService.createOrder(createOrderDto.userId);
    }
    
    @ApiOperation({ summary: 'Get an order by ID' })
    @ApiParam({ name: 'orderId', required: true, description: 'ID of the order to be retrieved'})   
    @ApiOkResponse({ type: Order, description: 'Order successfully retrieved'})
    @ApiNotFoundResponse({ description: 'Order not found'})
    @Get(':orderId')
    getOrderById (@Param('orderId', ParseIntPipe) orderId: number): Promise<Order> {
        return this.orderService.getOrderById(orderId);
    }
    
    @ApiOperation({ summary: 'Update an order status' })
    @ApiParam({ name: 'orderId', required: true, description: 'ID of the order to be updated'})
    @ApiOkResponse({ type: Order , description: 'Order status successfully updated'})
    @Put(':orderId/status')
    UpdateOrderStatus (@Param('orderId', ParseIntPipe) orderId: number, @Body() updateOrderStatusDto: UpdateOrderStatusDto): Promise<Order> {
        return this.orderService.UpdateOrderStatus(orderId, updateOrderStatusDto.status);
    }
}