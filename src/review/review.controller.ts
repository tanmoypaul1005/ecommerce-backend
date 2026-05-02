import { Body, Controller, Get, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ReviewService } from './review.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { CreateReviewDto } from './dto/review.dto';

@Controller('review')
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) { }

    @Get()
    async getAllReviews() {
        return await this.reviewService.getAllReviews();
    }

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('CUSTOMER')
    async createReview(
        @Req() req: { user?: { sub?: string } },
        @Body() dto: CreateReviewDto,
    ) {
            const userId = req.user?.sub;
                if (!userId) {
                    throw new UnauthorizedException('Missing user id');
                }
        return await this.reviewService.createReview(userId, dto);
    }
}