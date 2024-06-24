import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsNotEmpty } from "class-validator";

export class CreateOrderDto {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: 1 , description: 'user id of user creating his order' })
    userId: number;
  }