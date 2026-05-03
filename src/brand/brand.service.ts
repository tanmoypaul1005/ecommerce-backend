import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BrandService {
    constructor(private readonly prisma: PrismaService) { }

    async getAllBrands() {
        const brands = await this.prisma.brand.findMany();
        return brands;
    }
}
