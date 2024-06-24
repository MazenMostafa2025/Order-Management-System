import { ApiProperty } from "@nestjs/swagger"
import { OrderStatus, Prisma } from "@prisma/client"
import { Decimal } from "@prisma/client/runtime/library"

export class Order {
        @ApiProperty({ description: 'unique identifier of the order'})
        orderId: number
        @ApiProperty({ example: '2023-06-24T12:00:00Z', description: 'the date the order was created'})
        orderDate: Date
        @ApiProperty({ example: '25.33', description: 'the total amount of money of the order'})
        total: Prisma.Decimal
        @ApiProperty({ enum: OrderStatus,
                 examples: [
                        OrderStatus.CANCELLED,
                         OrderStatus.DELIVERED,
                          OrderStatus.PENDING,
                           OrderStatus.PROCESSING,
                            OrderStatus.SHIPPED
                        ],
                         description: 'the current status of the order'})
        status: OrderStatus
        @ApiProperty({ description: 'the id of the user the order belongs to'})
        userId: number
}
