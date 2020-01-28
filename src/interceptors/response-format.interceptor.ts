import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Logger } from 'nestjs-pino';
import { ApiResponse } from '../dto/support/api.response';
import { Request } from 'express';

export class ResponseFormatInterceptor implements NestInterceptor {
  constructor(private logger: Logger) {
  }
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {

    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();

    return next.handle().pipe(map(data => {
      if (data instanceof ApiResponse) {
        data.setPath(request.path);
        return data;
      }
      return ApiResponse.success(data).setPath(request.path);
    }));
  }
}
