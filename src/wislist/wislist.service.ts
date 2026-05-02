import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateWishlistDto } from './dto/wishlist.dto';

@Injectable()
export class WislistService {
    constructor(private readonly prisma: PrismaService) {}

    async createWishlist(userId: string, dto: CreateWishlistDto) {
        const existingWishlist = await this.prisma.wishlist.findFirst({
            where: {
                userId,
                productId: dto.productId,
            }
        });
        if (existingWishlist) {
          await this.prisma.wishlist.delete({
                where: {
                    id: existingWishlist.id
                }
            });
          return {
              message: 'Wishlist item removed',
          };
        }
        const created = await this.prisma.wishlist.create({
            data: {
                userId,
                productId: dto.productId,
            }
        });
        return {
            message: 'Wishlist item added',
            data: created,
        };
    }

    async getAllWishlists(userId: string) {
        return this.prisma.wishlist.findMany({
            where: { userId },
        });
    }
}
