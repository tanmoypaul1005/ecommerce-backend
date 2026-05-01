import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary, type UploadApiResponse } from 'cloudinary';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UploadService {
  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {
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

  async uploadImage(file: Express.Multer.File, userId?: string) {
    if (!file) {
      throw new BadRequestException('No image provided');
    }
    if (!userId) {
      throw new BadRequestException('User is required');
    }

    const result = await this.uploadBuffer(file.buffer, file.originalname);
    const media = await this.prisma.media.create({
      data: {
        url: result.secure_url,
        publicId: result.public_id,
        width: result.width,
        height: result.height,
        format: result.format,
        userId,
      },
    });

    return {
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
      mediaId: media.id,
    };
  }

  async uploadImages(files: Express.Multer.File[], userId?: string) {
    if (!files || files.length === 0) {
      throw new BadRequestException('No images provided');
    }
    if (!userId) {
      throw new BadRequestException('User is required');
    }

    const uploads = await Promise.all(
      files.map((file) => this.uploadBuffer(file.buffer, file.originalname)),
    );

    const mediaRecords = await Promise.all(
      uploads.map((result) =>
        this.prisma.media.create({
          data: {
            url: result.secure_url,
            publicId: result.public_id,
            width: result.width,
            height: result.height,
            format: result.format,
            userId,
          },
        }),
      ),
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
      mediaIds: mediaRecords.map((record) => record.id),
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
