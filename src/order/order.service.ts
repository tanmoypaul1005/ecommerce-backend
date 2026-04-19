import { BadRequestException, Injectable } from '@nestjs/common';
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
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        userType: true,
                        createdAt: true,
                    },
                },
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
        const productIds = [...new Set(items.map((item) => item.productId))];
        const products = await this.prisma.product.findMany({
            where: {
                id: {
                    in: productIds,
                },
            },
            select: {
                id: true,
                price: true,
                discount: true,
            },
        });

        if (products.length !== productIds.length) {
            throw new BadRequestException('One or more products not found');
        }

        const priceById = new Map(
            products.map((product) => [product.id, product]),
        );
        const itemsWithPrice = items.map((item) => {
            const product = priceById.get(item.productId);
            const discount = product?.discount ?? 0;
            const unitPrice = Math.abs((product?.price ?? 0) - discount);
            return {
                ...item,
                unitPrice,
            };
        });
        const totalPrice = itemsWithPrice.reduce((sum, item) => {
            return sum + item.unitPrice * item.quantity;
        }, 0);

        const isPaidMethod = paymentMethod === 'CARD' || paymentMethod === 'BKASH';
        const order = await this.prisma.order.create({
            data: {
                userId,
                addressId,
                items: {
                    create: itemsWithPrice,
                },
                paymentMethod,
                status: isPaidMethod ? 'PROCESSING' : 'PENDING',
                paymentStatus: isPaidMethod ? 'PAID' : 'UNPAID',
                totalPrice,
            },
            include: {
                items: true,    
                address: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        userType: true,
                        createdAt: true,
                    },
                },
            },
        });
        return order;
    }
}
