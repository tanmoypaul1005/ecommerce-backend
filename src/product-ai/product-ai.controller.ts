import { Body, Controller, Post } from '@nestjs/common';
import { ProductAiGenerateDto } from './dto/product-ai.dto';
import { ProductAiService } from './product-ai.service';

@Controller('product-ai')
export class ProductAiController {
	constructor(private readonly productAiService: ProductAiService) {}

	@Post('generate')
	generate(@Body() body: ProductAiGenerateDto) {
		const raw = body as unknown as Record<string, unknown>;
		const normalized = {
			...body,
			additionalInfo:
				body.additionalInfo ??
				raw.adisonalinfo ??
				raw.additionalinfo ??
				[],
		} as ProductAiGenerateDto;

		return this.productAiService.generateProductText(normalized);
	}
}
