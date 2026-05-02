import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReviewService {
    constructor(private readonly prisma: PrismaService) { }

    async getAllReviews() {
        const reviews = await this.prisma.review.findMany();
        return reviews;
    }

}
