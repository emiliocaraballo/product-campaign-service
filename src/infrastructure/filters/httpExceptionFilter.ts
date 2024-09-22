import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { IErrorData } from './IErrorData';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private currentMicroservice = '';

  constructor(currentMicroservice?: string) {
    this.currentMicroservice = currentMicroservice;
  }

  async catch(exception: HttpException, host: ArgumentsHost) {
    // Default error message obj
    const defaultErrorMessage = {
      code: 'UNEXPECTED_ERROR',
      description: 'Ha ocurrido un error inesperado',
      title: 'Lo sentimos',
      resultCode: -1,
    };
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    try {
      // Get response error data
      const responseError = exception.getResponse() as IErrorData;
      // SET data from errorMessage table
      const errorMessageData: IErrorData = {
        code: responseError?.code || defaultErrorMessage.code,
        description: responseError?.description || defaultErrorMessage.description,
        title: responseError?.title || defaultErrorMessage.title,
        resultCode: responseError?.resultCode != null ? responseError?.resultCode : defaultErrorMessage.resultCode,
        additionalData: responseError?.additionalData,
      };

      response.status(status).json({
        ...errorMessageData,
        statusCode: status || 500,
        path: request.url,
      });
    } catch (errorFilter) {
      response.status(status).json({
        ...defaultErrorMessage,
        statusCode: status || 500,
        path: request.url,
      });
    }
  }
}
