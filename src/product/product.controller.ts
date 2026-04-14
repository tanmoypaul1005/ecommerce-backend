import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/product.dto';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

     @Post('')
     @UseGuards(JwtAuthGuard)
     register(@Body() dto: CreateProductDto) {
       return this.productService.createProduct(dto);
     }

}
