import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((response) => {
        if (response?.pagination) {
          return {
            message: 'Success',
            statusCode: context.switchToHttp().getResponse().statusCode,
            data: response.data,
            pagination: response.pagination,
          };
        }

        return {
          message: 'Success',
          statusCode: context.switchToHttp().getResponse().statusCode,
          data: response,
        };
      }),
    );
  }
}
