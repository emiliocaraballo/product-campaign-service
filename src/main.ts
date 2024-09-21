import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json } from 'body-parser';
import helmet from 'helmet';
import constants from 'src/infrastructure/config/constants';
import { setSwaggerConfig } from 'src/presentation/swagger/swagger.config';
import { HttpExceptionFilter } from 'src/infrastructure/filters/httpExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  // Set limit to request
  app.use(json({ limit: '5mb' }));

  // Set prefix
  app.setGlobalPrefix(constants.API_PREFIX);

  if (constants.NODE_ENV !== 'production') {
    // Set swagger docs
    setSwaggerConfig(app, constants.API_PREFIX + 'docs');
  }
  // Set general error filter
  app.useGlobalFilters(new HttpExceptionFilter('product-campaign'));

  // Set helmet config
  app.use(helmet());

  // Init app services
  await app.startAllMicroservices();
  await app.listen(constants.APP_PORT);
}
bootstrap();
