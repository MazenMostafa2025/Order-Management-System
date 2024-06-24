import { Controller, Get, Post, Put, Delete, Body, Param, HttpException, HttpStatus, ValidationPipe, UsePipes, ParseIntPipe } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/AddToCart.dto';
import { RemoveFromCartDto } from './dto/RemoveFromCart.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { UpdateCartDto } from './dto/UpdateCart.dto';
import { Cart } from './entities/cart.entity';
import { ProductsQuantity } from './entities/ProductsQuantity.entity';
import { CartProduct } from './entities/CartProduct.entity';

@ApiTags('cart')
@Controller('cart')
export class CartController {

    constructor(private cartService: CartService) {}
    @UsePipes(ValidationPipe)

    @ApiOperation({ summary: 'Add item to cart' })
    @ApiOkResponse({ type: Cart , description: 'the item has been added to the cart'})
    @ApiCreatedResponse({ type: Cart , description: 'the item has been added to the cart'})
    @ApiBadRequestResponse({ description: 'the quantity to be added is greater than the stock'})
    @Post('/add')
    async addToCart (@Body() addToCartDto: AddToCartDto): Promise<Cart> {
        return await this.cartService.addToCart(addToCartDto);
    }

    @ApiOperation({ summary: 'View cart' })
    @ApiOkResponse({ type: ProductsQuantity, isArray: true, description: 'the items in the cart'})
    @ApiBadRequestResponse({ description: 'the user has no items in the cart'})
    @ApiParam({ name: 'userId', description: 'the ID of the user'})
    @Get(':userId')
    async viewCart(@Param('userId', ParseIntPipe) userId: number) : Promise<ProductsQuantity[]>{
        const cart = await this.cartService.viewCart(userId);
        return cart;
    }


    @ApiOperation({ summary: 'Update cart' })
    @ApiCreatedResponse({ type: CartProduct, description: 'the item has been updated in the cart' })
    @ApiOkResponse({ type: CartProduct, description: 'the item has been updated in the cart' })
    @Put('/update')
    async updateCart (@Body() updateCartDto: UpdateCartDto) : Promise<CartProduct>{
        return await this.cartService.updateCart(updateCartDto);
    }

    @ApiOperation({ summary: 'Remove item from cart' })
    @ApiOkResponse({ description: 'the item has been removed from the cart' })
    @Delete('remove')
    async removeFromCart(@Body() removeFromCartDto: RemoveFromCartDto) {
        return await this.cartService.removeFromCart(removeFromCartDto);  
    }

}
