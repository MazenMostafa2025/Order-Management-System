import { ApiProperty } from "@nestjs/swagger"

export class ProductsQuantity {
    @ApiProperty({ description: "product id of product in cart" })
    productId: number
    @ApiProperty({ description: "quantity of product in the cart"})
    quantity: number
}