import { Body, Controller, Post, UseGuards, Get, Param, Query } from '@nestjs/common';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ProductService } from './product.service';
import { PaginationDto } from '../common/pagination/pagination.dto';
import { CreateProductDto } from './dto/product.dto';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Post('')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN', 'SUPER_ADMIN')
    register(@Body() dto: CreateProductDto) {
        return this.productService.createProduct(dto);
    }

    @Get('')
    getAllProducts(@Query() pagination: PaginationDto) {
        return this.productService.getAllProducts(pagination);
    }

    @Get(':id')
    getProductById(@Param('id') id: string) {
        return this.productService.getProductById(id);
    }

}
