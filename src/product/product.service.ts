import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
    constructor(private readonly prisma: PrismaService) {}

    async createProduct(productData:CreateProductDto){
        const product = await this.prisma.product.create({
            data: productData
        })
        return product;
    }

    async getAllProducts(){
        const product =await this.prisma.product.findMany();
        return product;
    }
}
