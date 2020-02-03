import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { Request, Response } from 'express';
import { ApiResponse } from '../dto/support/api.response';
import { ERRORS } from '../constants/errors.constant';

@Catch()
export class InternalExceptionFilter implements ExceptionFilter<any> {

  constructor(private logger: Logger) {}

  catch(exception: any, host: ArgumentsHost) {
    const http = host.switchToHttp();
    const request = http.getRequest<Request>();
    const response = http.getResponse<Response>();

    this.logger.error(exception);
    console.error(exception);

    response.status(500).json(ApiResponse.error(ERRORS.INTERNAL_ERROR.error_code, ERRORS.INTERNAL_ERROR.error_message).setPath(request.path));
  }
}
