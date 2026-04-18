import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let details: string[] | undefined;
    let error = 'Error';

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      error = exception.name;
      const payload = exception.getResponse();

      if (typeof payload === 'string') {
        message = payload;
      } else if (payload && typeof payload === 'object') {
        const payloadMessage = (payload as { message?: unknown }).message;

        if (Array.isArray(payloadMessage)) {
          details = payloadMessage.map(String);
          message = details.join(', ');
        } else if (typeof payloadMessage === 'string') {
          message = payloadMessage;
        }

        const payloadError = (payload as { error?: unknown }).error;
        if (typeof payloadError === 'string') {
          error = payloadError;
        }
      }
    } else if (exception instanceof PrismaClientValidationError) {
      statusCode = HttpStatus.BAD_REQUEST;
      error = 'ValidationError';
      const unknownFieldMatch = exception.message.match(
        /Unknown argument `([^`]+)`/,
      );
      if (unknownFieldMatch) {
        const field = unknownFieldMatch[1];
        message = `Invalid request data: unknown field '${field}'.`;
        details = [`Remove '${field}' from payload or update schema.`];
      } else {
        message = 'Invalid request data.';
      }
    } else if (exception instanceof PrismaClientKnownRequestError) {
      statusCode = HttpStatus.BAD_REQUEST;
      error = exception.code;
      if (exception.code === 'P2002') {
        message = 'Unique constraint failed.';
        const target = (exception.meta as { target?: string[] })?.target;
        if (Array.isArray(target) && target.length > 0) {
          details = [`Duplicate value for: ${target.join(', ')}`];
        }
      } else if (exception.code === 'P2025') {
        statusCode = HttpStatus.NOT_FOUND;
        message = 'Record not found.';
      } else {
        message = 'Database request failed.';
      }
    } else if (exception instanceof Error) {
      message = exception.message || message;
      error = exception.name || error;
    }

    response.status(statusCode).json({
      success: false,
      statusCode,
      message,
      error,
      details,
      path: request?.url,
      timestamp: new Date().toISOString(),
    });
  }
}
