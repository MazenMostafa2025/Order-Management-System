import { ApiProperty } from "@nestjs/swagger"

export class CartProduct {
    @ApiProperty({ description: "Cart Id of the product" })
    cartId: number
    @ApiProperty({ description: "Product Id of the product" })
    productId: number
    @ApiProperty({ description: "Quantity of the product in the specified cart"})
    quantity: number
}