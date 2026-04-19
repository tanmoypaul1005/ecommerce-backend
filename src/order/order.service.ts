import { Injectable } from '@nestjs/common';
import { PaymentMethod } from '@prisma/client';
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

    async createOrder(
        userId: string,
        paymentMethod: PaymentMethod | undefined,
        items: { productId: string; quantity: number }[],
        addressId?: string,
    ) {
        const isPaidMethod = paymentMethod === 'CARD' || paymentMethod === 'BKASH';
        const order = await this.prisma.order.create({
            data: {
                userId,
                addressId,
                items: {
                    create: items,
                },
                paymentMethod,
                status: isPaidMethod ? 'PROCESSING' : 'PENDING',
                paymentStatus: isPaidMethod ? 'PAID' : 'UNPAID',
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
