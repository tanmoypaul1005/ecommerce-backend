import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';

@Module({
  imports: [AuthModule],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
