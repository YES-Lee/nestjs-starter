import { ExceptionFilter, UnauthorizedException, Catch, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiResponse } from '../dto/support/api.response';

@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter implements ExceptionFilter<UnauthorizedException> {
  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const http = host.switchToHttp();
    const request = http.getRequest<Request>();
    const response = http.getResponse<Response>();

    response.status(exception.getStatus()).json(ApiResponse.error(401, 'Unauthorized').setPath(request.path));
  }
}
