import { Body, Controller, Get, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
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
    createAddress(
        @Req() req: { user?: { sub?: string } },
        @Body() dto: CreateAddressDto,
    ) {
        const userId = req.user?.sub;
        if (!userId) {
            throw new UnauthorizedException('Missing user id');
        }
        return this.addressService.createAddress(userId, dto);
    }

    @Get('')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('CUSTOMER')
    getAddressList(@Req() req: { user?: { sub?: string } }) {
        const userId = req.user?.sub;
        if (!userId) {
            throw new UnauthorizedException('Missing user id');
        }
        return this.addressService.getAddressList(userId);
    }
}
