import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { Request, Response } from 'express';
import { ApiResponse } from '../dto/support/api.response';

@Catch()
export class InternalExceptionFilter implements ExceptionFilter<any> {

  constructor(private logger: Logger) {}

  catch(exception: any, host: ArgumentsHost) {
    const http = host.switchToHttp();
    const request = http.getRequest<Request>();
    const response = http.getResponse<Response>();

    this.logger.error(exception);
    console.error(exception);

    response.status(500).json(ApiResponse.error(500, 'internal error').setPath(request.path));
  }
}
