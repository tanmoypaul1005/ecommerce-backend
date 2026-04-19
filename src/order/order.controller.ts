import { Controller, Get, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) { }

    @Get('')
    @UseGuards(JwtAuthGuard)
    getAllOrders(@Req() req: { user?: { sub?: string } }) {
        const userId = req.user?.sub;
        if (!userId) {
            throw new UnauthorizedException('Missing user id');
        }
        return this.orderService.getAllOrders(userId);
    }

    @Post('')
    @UseGuards(JwtAuthGuard)
    createOrder(@Req() req: { user?: { sub?: string } }, paymentMethod, items: { productId: string; quantity: number }[], addressId: string) {
        const userId = req.user?.sub;
        if (!userId) {
            throw new UnauthorizedException('Missing user id');
        }
        return this.orderService.createOrder(userId, paymentMethod, items, addressId);
    }

}
