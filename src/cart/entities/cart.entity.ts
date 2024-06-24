import { ApiProperty } from "@nestjs/swagger"

export class Cart {
  @ApiProperty({ description: 'the unique identifier of the cart' }) 
  cartId: number
  @ApiProperty({ description: 'the unique identifier of the product'})
  productId: number
  @ApiProperty({ description: 'the quantity of the product in the cart'})
  quantity: number
}