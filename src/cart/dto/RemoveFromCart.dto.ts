import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber } from "class-validator"

export class RemoveFromCartDto {
    @ApiProperty({ example: 1, description: 'user id of user to remove from cart'})
    @IsNotEmpty()
    @IsNumber()
    userId: number
    @ApiProperty({ example: 1, description: 'product id to be removed from cart' })
    @IsNotEmpty()
    @IsNumber()
    productId: number
}