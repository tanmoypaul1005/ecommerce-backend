import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
    constructor(private readonly prisma: PrismaService) {}

    async createCategory(data:CreateCategoryDto) {
        const category = await this.prisma.category.create({
            data: data
        });
        return category;
    }

    
}
