import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BrandDto } from './dto/brand.dto';

@Injectable()
export class BrandService {
    constructor(private readonly prisma: PrismaService) { }

    async getAllBrands() {
        const brands = await this.prisma.brand.findMany();
        return brands;
    }

    async createBrand(dto:BrandDto) {
        const created = await this.prisma.brand.create({
            data: dto,
        });
        return {
            message: 'Brand created',
            data: created,
        };
    }
}
