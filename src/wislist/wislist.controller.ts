import { Body, Controller, Get, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { WislistService } from './wislist.service';
import { CreateWishlistDto } from './dto/wishlist.dto';

@Controller('wislist')
export class WislistController {
    constructor(private readonly wislistService: WislistService) {}


    @Get('')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('CUSTOMER')
    async getAllWishlists(@Req() req: { user?: { sub?: string } }) {
        const userId = req.user?.sub;
        if (!userId) {
            throw new UnauthorizedException('Missing user id');
        }
        return this.wislistService.getAllWishlists(userId);
    }

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('CUSTOMER')
    async createWishlist(
        @Req() req: { user?: { sub?: string } },
        @Body() dto: CreateWishlistDto,
    ) {
        const userId = req.user?.sub;
        if (!userId) {
            throw new UnauthorizedException('Missing user id');
        }
        return this.wislistService.createWishlist(userId, dto);
    }

}
