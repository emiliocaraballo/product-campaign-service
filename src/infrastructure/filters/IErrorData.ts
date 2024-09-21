import { HttpStatus } from '@nestjs/common';

export interface IErrorData {
  statusCode?: HttpStatus;
  resultCode?: number;
  code?: string;
  description?: string;
  title?: string;
  errorType?: string;
  exceptionDetails?: [
    {
      component: string;
      description: string;
      endpoint: string;
    },
  ];
  additionalData?: any;
}
