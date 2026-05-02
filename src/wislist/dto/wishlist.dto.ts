import { IsOptional, IsUUID } from 'class-validator';

export class CreateWishlistDto {
  @IsUUID()
  productId: string;
}

export class UpdateWishlistDto {
  @IsOptional()
  @IsUUID()
  productId?: string;
}
