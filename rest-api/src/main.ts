import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // allows Express APIs to be used as well
  const port = 9000;
  await app.listen(port);
  console.log('running on port ' + port);
}

bootstrap();
