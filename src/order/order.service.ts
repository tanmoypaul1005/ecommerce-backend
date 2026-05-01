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
        const quantityById = new Map<string, number>();
        for (const item of items) {
            quantityById.set(
                item.productId,
                (quantityById.get(item.productId) ?? 0) + item.quantity,
            );
        }
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
                stock: true,
            },
        });

        if (products.length !== productIds.length) {
            throw new BadRequestException('One or more products not found');
        }

        const priceById = new Map(
            products.map((product) => [product.id, product]),
        );
        for (const [productId, requiredQty] of quantityById) {
            const product = priceById.get(productId);
            if (!product || product.stock < requiredQty) {
                throw new BadRequestException('Insufficient stock');
            }
        }
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
        const order = await this.prisma.$transaction(async (tx) => {
            for (const [productId, requiredQty] of quantityById) {
                const result = await tx.product.updateMany({
                    where: {
                        id: productId,
                        stock: {
                            gte: requiredQty,
                        },
                    },
                    data: {
                        stock: {
                            decrement: requiredQty,
                        },
                    },
                });

                if (result.count === 0) {
                    throw new BadRequestException('Insufficient stock');
                }
            }

            return tx.order.create({
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
        });
        return order;
    }
}
