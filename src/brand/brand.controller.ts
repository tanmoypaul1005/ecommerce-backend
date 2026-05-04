import { Body, Controller, Get, Post } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandDto } from './dto/brand.dto';

@Controller('brand')
export class BrandController {
    constructor(private readonly brandService: BrandService) { }

    @Get()
    async getAllBrands() {
        return await this.brandService.getAllBrands();
    }

    @Post()
    async createBrand(@Body() dto: BrandDto) {
        return await this.brandService.createBrand(dto);
    }

}
