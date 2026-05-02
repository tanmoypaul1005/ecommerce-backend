import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReviewDto } from './dto/review.dto';

@Injectable()
export class ReviewService {
    constructor(private readonly prisma: PrismaService) { }

    async createReview(userId: string, dto: CreateReviewDto) {
        await this.prisma.review.create({
            data: {
                rating: dto.rating,
                comment: dto.comment,
                productId: dto.productId,
                userId: userId,
            }
        });
    }

    async getAllReviews() {
        const reviews = await this.prisma.review.findMany();
        return reviews;
    }

}
