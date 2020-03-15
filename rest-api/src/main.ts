import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {HttpExceptionFilter} from './filters/http-exception.filter';
import {FallbackExceptionFilter} from './filters/fallback-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'); // let all controllers start with /api/
  app.useGlobalFilters(
    // order important, from generic to specific
    new FallbackExceptionFilter(),
    new HttpExceptionFilter()
  );

  const port = 9000;
  await app.listen(port);
  console.log('running on port ' + port);
}

bootstrap();
