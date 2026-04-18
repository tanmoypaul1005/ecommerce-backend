import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderService {
    constructor(private readonly prisma: PrismaService) {}

    async getAllOrders(params: { userId?: string }) {
        const orders = await this.prisma.order.findMany({
            where: {
                userId: params.userId,
            },
            include: {
                items: true,
                address: true,
                user: true,
            },
        });
        return orders;
    }
}
