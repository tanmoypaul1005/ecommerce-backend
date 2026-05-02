import { Controller, Get, Post } from '@nestjs/common';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) { }

    @Get()
    async getAllReviews() {
        return await this.reviewService.getAllReviews();
    }

    @Post()
    async createReview() {
        return await this.reviewService.createReview();
    }
};