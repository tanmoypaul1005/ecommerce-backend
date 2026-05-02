import { Controller, Get } from '@nestjs/common';
import { WislistService } from './wislist.service';

@Controller('wislist')
export class WislistController {
    constructor(private readonly wislistService: WislistService) {}


    @Get()
    async getAllWishlists() {
        return this.wislistService.getAllWishlists();
    }
}
