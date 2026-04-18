import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface StandardResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data?: T;
}

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, StandardResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<StandardResponse<T>> {
    return next.handle().pipe(
      map((data: T) => {
        const response = context.switchToHttp().getResponse();
        const statusCode = response?.statusCode ?? 200;

        if (
          data &&
          typeof data === 'object' &&
          'success' in data &&
          'statusCode' in data &&
          'message' in data
        ) {
          return data as unknown as StandardResponse<T>;
        }

        const message =
          data &&
          typeof data === 'object' &&
          'message' in data &&
          typeof (data as { message?: unknown }).message === 'string'
            ? (data as { message: string }).message
            : 'Success';

        return {
          success: true,
          statusCode,
          message,
          data,
        };
      }),
    );
  }
}
