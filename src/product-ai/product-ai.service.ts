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

    async generateProductText(payload: ProductAiGenerateDto): Promise<{
        title: string;
        slug: string;
        description: string;
        additionalInformation: Array<{ key: string; value: string }>;
    }> {
        const generatedSlug = this.toSlug(payload.title);
        const outputLanguage = payload.language?.trim() || 'English';
        const context = {
            title: payload.title,
            slug: payload.slug ?? generatedSlug,
            description: payload.description ?? '',
            language: outputLanguage,
            additionalInfo: payload.additionalInfo ?? [],
        };

        const prompt =
            'Generate a unique, high-quality product description based on the context. ' +
            'Return ONLY valid JSON with this exact shape (no markdown, no code fences): ' +
            '{"title":"...","slug":"...","description":"...","additionalInformation":[{"key":"...","value":"..."}]}\n' +
            'Use the input title/slug as-is, and expand description and additionalInformation. ' +
            'Write all text in the requested language from the context; default is English.\n\nContext:\n' +
            JSON.stringify(context, null, 2);

        const result = await this.model.generateContent(prompt);
        const text = result.response.text().trim();
        const cleaned = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '');
        const parsed = JSON.parse(cleaned) as {
            title: string;
            slug: string;
            description: string;
            additionalInformation: Array<{ key: string; value: string }>;
        };

        return parsed;
    }

    private toSlug(value: string): string {
        return value
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }
}
