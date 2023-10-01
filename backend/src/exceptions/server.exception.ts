import { HttpException } from '@nestjs/common';
import { code2message, code2status, ErrorCode } from './error-codes';
export class ServerException extends HttpException {
  public code: ErrorCode;

  constructor(code: ErrorCode) {
    const message = code2message.get(code);
    const status = code2status.get(code);
    super({ errorCode: code, message, status }, status);
    this.code = code;
  }
}
