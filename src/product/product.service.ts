import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from '../common/pagination/pagination.dto';
import { buildPagination, buildPaginationMeta } from '../common/pagination/pagination.util';
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

    async getAllProducts(pagination: PaginationDto){
        const { page, limit, skip } = buildPagination(pagination);

        const [items, total] = await Promise.all([
            this.prisma.product.findMany({
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.product.count(),
        ]);

        return {
            items,
            meta: buildPaginationMeta(total, page, limit),
        };
    }

    async getProductById(id: string){
        const singelproduct = await this.prisma.product.findUnique({
            where: { id },
            include: { category: true }
        });
        return singelproduct;
    }
}
