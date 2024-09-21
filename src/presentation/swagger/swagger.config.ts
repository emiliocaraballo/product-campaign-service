// Libraries
import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import constants from 'src/infrastructure/config/constants';

// Set swagger configuration
export const setSwaggerConfig = (app: INestApplication, docsPath: string) => {
  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API Docs for api')
    .setVersion('1.0')
    .addBearerAuth(
      {
        name: 'Authorization',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header',
      },
      'accessToken',
    )
    .addServer(constants.API_URL_SWAGGER)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(docsPath || 'docs', app, document, {
    swaggerOptions: { filter: true },
  });
};
