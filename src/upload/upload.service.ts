import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary, type UploadApiResponse } from 'cloudinary';
import type { Express } from 'express';

@Injectable()
export class UploadService {
  constructor(private readonly configService: ConfigService) {
    const cloudName = this.configService.get<string>('CLOUDINARY_CLOUD_NAME');
    const apiKey = this.configService.get<string>('CLOUDINARY_API_KEY');
    const apiSecret = this.configService.get<string>('CLOUDINARY_API_SECRET');

    if (!cloudName || !apiKey || !apiSecret) {
      throw new Error('Cloudinary env vars are missing');
    }

    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
      secure: true,
    });
  }

  async uploadImage(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No image provided');
    }

    const result = await this.uploadBuffer(file.buffer, file.originalname);
    return {
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
    };
  }

  async uploadImages(files: Express.Multer.File[]) {
    if (!files || files.length === 0) {
      throw new BadRequestException('No images provided');
    }

    const uploads = await Promise.all(
      files.map((file) => this.uploadBuffer(file.buffer, file.originalname)),
    );

    return {
      count: uploads.length,
      images: uploads.map((result) => ({
        url: result.secure_url,
        publicId: result.public_id,
        width: result.width,
        height: result.height,
        format: result.format,
      })),
    };
  }

  private uploadBuffer(buffer: Buffer, filename: string) {
    return new Promise<UploadApiResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'ecommerce',
          resource_type: 'image',
          use_filename: true,
          unique_filename: true,
          filename_override: filename,
        },
        (error, result) => {
          if (error || !result) {
            reject(new InternalServerErrorException('Cloudinary upload failed'));
            return;
          }
          resolve(result);
        },
      );

      uploadStream.end(buffer);
    });
  }
}
