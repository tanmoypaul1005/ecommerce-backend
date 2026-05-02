import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WislistService {
    constructor(private readonly prisma: PrismaService) {}

    async getAllWishlists() {
        return this.prisma.wishlist.findMany();
    }
}
