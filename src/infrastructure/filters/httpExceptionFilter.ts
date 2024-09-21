import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { IErrorData } from './IErrorData';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private currentMicroservice = '';

  constructor(currentMicroservice?: string) {
    this.currentMicroservice = currentMicroservice;
  }

  catch(exception: HttpException, host: ArgumentsHost) {
    // Default error message obj
    const defaultErrorMessage = {
      code: 'UNEXPECTED_ERROR',
      description: 'Ha ocurrido un error inesperado',
      title: 'Lo sentimos',
    };
    let responseError;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    try {
      responseError = exception?.getResponse() as IErrorData;
      // const request = ctx.getRequest<Request>();
    } catch (error) {}
    // SET data from errorMessage table
    const errorMessageData: IErrorData = {
      code: responseError?.code || defaultErrorMessage.code,
      description: responseError?.description || defaultErrorMessage.description,
      title: defaultErrorMessage.title,
      additionalData: responseError?.additionalData,
      statusCode: responseError?.statusCode,
    };
    response.status(status).json({
      ...errorMessageData,
      timestamp: new Date().toISOString(),
    });
  }
}
