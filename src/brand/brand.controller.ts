import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
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

    @Get(':id')
    async getBrandById(@Param('id') id: string) {
        return await this.brandService.getBrandById(id);    
    }

    @Delete(':id')
    async deleteBrand(@Param('id') id: string) {
        return await this.brandService.deleteBrand(id);
    }

    @Put(':id')
    async updateBrand(@Param('id') id: string, @Body() dto: BrandDto) {
        return await this.brandService.updateBrand(id, dto);
    }

}
