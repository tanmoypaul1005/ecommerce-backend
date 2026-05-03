import { IsString } from "class-validator";

 export class BrandDto {

    name: string;
    @IsString()

    imageUrl: string;
    @IsString()

    description?: string;

 }