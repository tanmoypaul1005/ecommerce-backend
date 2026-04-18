import { Body, Controller, Post } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/address.dto';

@Controller('address')
export class AddressController {
    constructor(private readonly addressService: AddressService) { }

    @Post('')
    createAddress(@Body() dto: CreateAddressDto) {
        return this.addressService.createAddress(dto);
    }
}
