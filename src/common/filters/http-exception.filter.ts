import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const payload = exception.getResponse();

      if (typeof payload === 'string') {
        message = payload;
      } else if (payload && typeof payload === 'object') {
        const payloadMessage = (payload as { message?: unknown }).message;

        if (Array.isArray(payloadMessage)) {
          message = payloadMessage.join(', ');
        } else if (typeof payloadMessage === 'string') {
          message = payloadMessage;
        }
      }
    }

    response.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  }
}
