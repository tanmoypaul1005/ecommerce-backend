import { Body, Controller, Get, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateOrderDto } from './dto/order.dto';
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
    createOrder(
        @Req() req: { user?: { sub?: string } },
        @Body() dto: CreateOrderDto,
    ) {
        const userId = req.user?.sub;
        if (!userId) {
            throw new UnauthorizedException('Missing user id');
        }
        return this.orderService.createOrder(
            userId,
            dto.paymentMethod,
            dto.items,
            dto.addressId,
        );
    }

}
