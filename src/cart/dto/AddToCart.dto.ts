import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber } from "class-validator"

export class AddToCartDto {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: 1, description: 'User Id of user to add product to his cart', required: true })
    userId: number
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: 1, description: 'Product Id of product to add in user cart' , required: true})
    productId: number
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: 2, description: 'Quantity of product to add in cart' , required: true})
    quantity: number
}