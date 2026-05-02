import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { WislistController } from './wislist.controller';
import { WislistService } from './wislist.service';

@Module({
  imports: [AuthModule],
  controllers: [WislistController],
  providers: [WislistService]
})
export class WislistModule {}
