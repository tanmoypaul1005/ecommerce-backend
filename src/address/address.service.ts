import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/address.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AddressService {
    constructor(private readonly prisma: PrismaService) {}

    async createAddress(userId: string, addressData: CreateAddressDto) {
        const address = await this.prisma.address.create({
            data: {
                ...addressData,
                userId,
            },
        });
        return address;
    }

    async getAddressList(userId: string) {
        const addressList = await this.prisma.address.findMany({
            where: {
                userId,
            },
        });
        return addressList;
    }
}
