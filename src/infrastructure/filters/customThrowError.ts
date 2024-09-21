// SWAGGER
import { ApiResponseOptions } from '@nestjs/swagger';

// Interfaces
import { IErrorData } from './IErrorData';

/**
 * Centralized function to return errors
 * @param additionalError additional Error data
 * @param errorCode Custom error code and get message from error code
 */
export const customThrowError = (additionalError: IErrorData, errorCode?: string, additionalData?: any): IErrorData => {
  // Default code

  // Get code error from additional error
  let code = errorCode || additionalError?.code;
  if (JSON.stringify(additionalError).indexOf('ERROR_WS') != -1) {
    code = 'ERROR_WS';
  }

  return {
    code,
    statusCode: additionalError?.statusCode || 404,
    description: additionalError?.description,
    errorType: additionalError?.errorType,
    exceptionDetails: additionalError?.exceptionDetails,
    additionalData: additionalError?.additionalData || additionalData,
  };
};

// General Response Errors Swagger
export const responseGeneralError: ApiResponseOptions = {
  // SWAGGER RESPONSE
  status: 400,
  schema: {
    properties: {
      code: { type: 'string' },
      description: { type: 'string' },
      title: { type: 'string' },
      statusCode: { type: 'number' },
      path: { type: 'string' },
    },
    type: 'object',
  },
  description: 'General Response Error.',
};
