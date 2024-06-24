import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber } from "class-validator"
export class UpdateCartDto {
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ example: 1, description: 'user id of user whose cart is being updated' })
    userId: number
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ example: 1, description: 'product id of product whose quantity is being updated' })
    productId: number
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ description: 'the updating quantity of the product in cart' })
    quantity: number
}