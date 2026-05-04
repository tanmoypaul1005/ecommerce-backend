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

    async getBrandById(id: string) {
        const brand = await this.prisma.brand.findUnique({
            where: { id },
        });
        return brand;
    }

    async deleteBrand(id: string) {
        await this.prisma.brand.delete({
            where: { id },
        });
        return {
            message: 'Brand deleted',
        };
    }

    async updateBrand(id: string, dto: BrandDto) {
        const updated = await this.prisma.brand.update({
            where: { id },
            data: dto,
        });
        return {
            message: 'Brand updated',
            data: updated,
        };
    }
}
