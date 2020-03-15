import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {HttpExceptionFilter} from './filters/http-exception.filter';
import {FallbackExceptionFilter} from './filters/fallback-exception.filter';
import * as mongoose from 'mongoose';
import {ValidationError, ValidationPipe} from '@nestjs/common';
import {ValidationFilter} from './filters/validation.filter';
import {ValidationException} from './filters/validation.exception';

// setting mongoose to use a new, not deprecated mongoDB method under the hood
mongoose.set('useFindAndModify', false);

const port = 9000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'); // let all controllers start with /api/
  app.useGlobalFilters(
    // order important, from generic to specific
    new FallbackExceptionFilter(),
    new HttpExceptionFilter(),
    new ValidationFilter() // implements HttpException so more specific
  );
  app.useGlobalPipes(new ValidationPipe({
    skipMissingProperties: false,
    exceptionFactory: (errors: ValidationError[]) => {
      const messages = errors.map(error => `${error.property} has wrong value ${error.value},
      ${Object.values(error.constraints).join(', ')}`);
      return new ValidationException(messages);
    }
  }));

  await app.listen(port);
}

bootstrap().then(() => console.log('running on port ' + port));
