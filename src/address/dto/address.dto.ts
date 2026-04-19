import { IsBoolean, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';

export enum AddressType {
	HOME = 'HOME',
	OFFICE = 'OFFICE',
}

export class CreateAddressDto {
	@IsString()
	fullName: string;

	@IsString()
	phone: string;

	@IsString()
	area: string;

	@IsString()
	addressLine1: string;

	@IsOptional()
	@IsString()
	addressLine2?: string;

	@IsOptional()
	@IsEnum(AddressType)
	type?: AddressType;

	@IsOptional()
	@IsBoolean()
	isDefault?: boolean;
}

export class UpdateAddressDto {
	@IsOptional()
	@IsString()
	fullName?: string;

	@IsOptional()
	@IsString()
	phone?: string;

	@IsOptional()
	@IsString()
	area?: string;

	@IsOptional()
	@IsString()
	addressLine1?: string;

	@IsOptional()
	@IsString()
	addressLine2?: string;

	@IsOptional()
	@IsEnum(AddressType)
	type?: AddressType;

	@IsOptional()
	@IsBoolean()
	isDefault?: boolean;
}
