import { Body, Controller, Get } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) { }

    @Get('')
    getAllOrders(@Body() params: { userId?: string }) {
        return this.orderService.getAllOrders(params);
    }

}
