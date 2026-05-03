import { GoogleGenerativeAI } from '@google/generative-ai';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ProductAiGenerateDto } from './dto/product-ai.dto';

@Injectable()
export class ProductAiService {
    private readonly model;

    constructor(private readonly configService: ConfigService) {
        const apiKey = this.configService.get<string>('GEMINI_API_KEY');
        if (!apiKey) {
            throw new InternalServerErrorException('GEMINI_API_KEY is not set');
        }

        const modelName =
            this.configService.get<string>('GEMINI_MODEL') ??
            'gemini-2.5-flash';

        const client = new GoogleGenerativeAI(apiKey);
        this.model = client.getGenerativeModel({ model: modelName });
    }

    async generateProductText(
        payload: ProductAiGenerateDto,
    ): Promise<{ response: string }> {
        const context = {
            title: payload.title,
            slug: payload.slug,
            description: payload.description,
            additionalInfo: payload.additionalInfo ?? [],
        };

        const prompt =
            'Generate a unique, high-quality product description based on the context. ' +
            'Return plain text only, no markdown, no extra labels.\n\nContext:\n' +
            JSON.stringify(context, null, 2);

        const result = await this.model.generateContent(prompt);
        const text = result.response.text().trim();

        return { response: text };
    }
}
