import { Type } from 'class-transformer';
import {
  IsArray,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class ProductAiAdditionalInfoDto {
  @IsString()
  key: string;

  @IsString()
  value: string;
}

export class ProductAiGenerateDto {
  @IsString()
  title: string;

  @IsString()
  slug: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductAiAdditionalInfoDto)
  additionalInfo?: ProductAiAdditionalInfoDto[];
}
