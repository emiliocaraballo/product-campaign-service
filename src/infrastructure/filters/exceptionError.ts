import { HttpException, HttpStatus } from '@nestjs/common';

export class ExceptionError extends HttpException {
  constructor({
    code = 'UNEXPECTED_ERROR',
    description = 'Ha ocurrido un error inesperado',
    title = 'Lo sentimos',
    resultCode = -1,
    statusCode = HttpStatus.NOT_FOUND,
  }: {
    code?: string;
    description?: string;
    title?: string;
    resultCode?: number;
    statusCode?: HttpStatus;
  }) {
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
