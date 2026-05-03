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

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  language?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductAiAdditionalInfoDto)
  additionalInfo?: ProductAiAdditionalInfoDto[];
}
