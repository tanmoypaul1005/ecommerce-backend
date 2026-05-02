import { Module } from '@nestjs/common';
import { WislistController } from './wislist.controller';
import { WislistService } from './wislist.service';

@Module({
  controllers: [WislistController],
  providers: [WislistService]
})
export class WislistModule {}
