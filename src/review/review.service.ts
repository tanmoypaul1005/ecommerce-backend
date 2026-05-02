import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReviewDto } from './dto/review.dto';

@Injectable()
export class ReviewService {
    constructor(private readonly prisma: PrismaService) { }

    async createReview(userId: string, dto: CreateReviewDto) {
        const created = await this.prisma.review.create({
            data: {
                rating: dto.rating,
                comment: dto.comment,
                productId: dto.productId,
                userId: userId,
            },
            include: {
                user: true,
                product: true,
            },
        });
        return {
            message: 'Review created',
            data: created,
        };
    }

    async getAllReviews() {
        const reviews = await this.prisma.review.findMany();
        return reviews;
    }

}
