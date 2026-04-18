import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/address.dto';

@Controller('address')
export class AddressController {
    constructor(private readonly addressService: AddressService) { }

    @Post('')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('CUSTOMER')
    createAddress(@Body() dto: CreateAddressDto) {
        return this.addressService.createAddress(dto);
    }
}
