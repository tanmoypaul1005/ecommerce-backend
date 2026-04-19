import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderService {
    constructor(private readonly prisma: PrismaService) {}

    async getAllOrders(userId: string) {
        const orders = await this.prisma.order.findMany({
            where: {
                userId,
            },
            include: {
                items: true,
                address: true,
                user: true,
            },
        });
        return orders;
    }

    async createOrder(userId: string, paymentMethod,items: { productId: string; quantity: number }[], addressId: string) {
        const order = await this.prisma.order.create({
            data: {
                userId,
                addressId,
                items,
                paymentMethod,
                status: (paymentMethod === 'CARD'  || paymentMethod === 'BKASH') ? 'PROCESSING' : 'PENDING',
                paymentStatus: (paymentMethod === 'CARD'  || paymentMethod === 'BKASH') ? 'PAID' : 'PENDING',
            },
            include: {
                items: true,    
                address: true,
                user: true,
            },
        });
        return order;
    }
}
