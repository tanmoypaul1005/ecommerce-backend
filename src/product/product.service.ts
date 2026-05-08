import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { buildPagination, buildPaginationMeta } from '../common/pagination/pagination.util';
import { CreateProductDto, ProductQueryDto } from './dto/product.dto';

@Injectable()
export class ProductService {
    constructor(private readonly prisma: PrismaService) {}

    async createProduct(productData:CreateProductDto){
        const product = await this.prisma.product.create({
            data: productData
        })
        return product;
    }

    async getAllProducts(query: ProductQueryDto){
        const { page, limit, skip } = buildPagination(query);
        const where: Prisma.ProductWhereInput = {};

        if (query.categoryId) {
            where.categoryId = query.categoryId;
        }

        if (query.isActive !== undefined) {
            where.isActive = query.isActive;
        }

        if (query.minPrice !== undefined || query.maxPrice !== undefined) {
            where.price = {
                gte: query.minPrice ?? undefined,
                lte: query.maxPrice ?? undefined,
            };
        }

        if (query.search) {
            where.OR = [
                { title: { contains: query.search, mode: 'insensitive' } },
                { description: { contains: query.search, mode: 'insensitive' } },
                { sku: { contains: query.search, mode: 'insensitive' } },
                { slug: { contains: query.search, mode: 'insensitive' } },
            ];
        }

        const [items, total] = await Promise.all([
            this.prisma.product.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.product.count({ where }),
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
