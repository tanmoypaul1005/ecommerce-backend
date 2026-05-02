import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReviewService {
    constructor(private readonly prisma: PrismaService) { }

    async createReview() {
        await this.prisma.review.create({
            data: {
                rating: 5,
                comment: 'Great product!',
                productId: 'some-product-id',
                userId: 'some-user-id',
            }
        });
    }

    async getAllReviews() {
        const reviews = await this.prisma.review.findMany();
        return reviews;
    }

}
