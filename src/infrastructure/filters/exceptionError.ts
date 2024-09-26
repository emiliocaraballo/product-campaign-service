import { HttpException, HttpStatus } from '@nestjs/common';

export class IMessageError {
  code?: string;
  title?: string;
  description?: string;
  resultCode?: number;
  statusCode?: number;
}

export class ExceptionError extends HttpException {
  constructor({
    code = 'UNEXPECTED_ERROR',
    description = 'Ha ocurrido un error inesperado',
    title = 'Lo sentimos',
    resultCode = -1,
    statusCode = HttpStatus.NOT_FOUND,
  }: IMessageError) {
    super(
      {
        code: code,
        title: title,
        description: description,
        statusCode: statusCode,
        resultCode: resultCode,
      },
      statusCode || HttpStatus.NOT_FOUND,
    );
  }
}
