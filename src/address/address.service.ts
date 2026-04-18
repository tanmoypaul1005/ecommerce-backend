import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/address.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AddressService {
    constructor(private readonly prisma: PrismaService) {}

    async createAddress(addressData: CreateAddressDto) {
        const address = await this.prisma.address.create({
            data: addressData
        });
        return address;
    }
}
