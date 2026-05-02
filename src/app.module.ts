import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { AddressModule } from './address/address.module';
import { OrderModule } from './order/order.module';
import { UploadModule } from './upload/upload.module';
import { ReviewModule } from './review/review.module';
import { WislistModule } from './wislist/wislist.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, AuthModule, ProductModule,ProductModule, CategoryModule, AddressModule, OrderModule, UploadModule, ReviewModule, WislistModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
