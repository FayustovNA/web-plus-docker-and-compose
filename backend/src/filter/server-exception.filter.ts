import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { ServerException } from '../exceptions/server.exception';

@Catch(ServerException)
export class ServerExceptionFilter implements ExceptionFilter {
  catch(exception: ServerException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();

    response.status(status).json({
      errorCode: exception.getResponse(),
      message: exception.getResponse(),
      status: exception.getStatus(),
    });
  }
}
