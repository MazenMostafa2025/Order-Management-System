import { ApiProperty } from "@nestjs/swagger";
import { OrderStatus } from "@prisma/client";
import { IsNotEmpty } from "class-validator";

export class UpdateOrderStatusDto {
    @IsNotEmpty()
    @ApiProperty({ description: "New order status", example: "PROCESSING-SHIPPED-DELIVERED-CANCELLED" })
    status: OrderStatus;
  }