import { IsOptional, IsString } from 'class-validator';

export class BrandDto {
   @IsString()
   name: string;

   @IsString()
   imageUrl: string;

   @IsOptional()
   @IsString()
   description?: string;
}