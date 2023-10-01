import { HttpStatus } from '@nestjs/common';

export enum ErrorCode {
  LoginOrPasswordIncorrect = 100,
  UserAlreadyExists = 101,
  UserNotFound = 404,
  DataNotFound = 404,
  WishNotFound = 404,
  IncorrectData = 401,
  Error = 400,
  DeleteForbidden = 403,
  Forbidden = 403,
  OfferSummForbidden = 403,
  SaveError = 400,
}

export const code2message = new Map<ErrorCode, string>([
  [ErrorCode.LoginOrPasswordIncorrect, 'Login or password is incorrect'],
  [ErrorCode.UserAlreadyExists, 'User already exists'],
  [ErrorCode.UserNotFound, 'User not found'],
  [ErrorCode.IncorrectData, 'Incorrect data'],
  [ErrorCode.Error, 'Error'],
  [ErrorCode.SaveError, 'Save error'],
  [ErrorCode.DataNotFound, 'Data not found'],
  [ErrorCode.DeleteForbidden, 'No access to delete'],
  [ErrorCode.Forbidden, 'This is your wish'],
  [ErrorCode.OfferSummForbidden, 'The amount exceeds the value of the gift'],
  [ErrorCode.WishNotFound, 'Wish not found'],
]);

export const code2status = new Map<ErrorCode, HttpStatus>([
  [ErrorCode.LoginOrPasswordIncorrect, HttpStatus.BAD_REQUEST],
  [ErrorCode.UserAlreadyExists, HttpStatus.BAD_REQUEST],
  [ErrorCode.UserNotFound, HttpStatus.NOT_FOUND],
  [ErrorCode.IncorrectData, HttpStatus.UNAUTHORIZED],
  [ErrorCode.Error, HttpStatus.BAD_REQUEST],
  [ErrorCode.SaveError, HttpStatus.BAD_REQUEST],
  [ErrorCode.DataNotFound, HttpStatus.NOT_FOUND],
  [ErrorCode.DeleteForbidden, HttpStatus.FORBIDDEN],
  [ErrorCode.Forbidden, HttpStatus.FORBIDDEN],
  [ErrorCode.OfferSummForbidden, HttpStatus.FORBIDDEN],
  [ErrorCode.WishNotFound, HttpStatus.NOT_FOUND],
]);
