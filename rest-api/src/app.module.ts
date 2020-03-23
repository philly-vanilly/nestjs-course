import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {CoursesModule} from './courses/courses.module';
import {MongooseModule} from '@nestjs/mongoose';
import {MONGO_CONNECTION} from '../../env';
import {AuthModule} from './auth/auth.module';
import {GetUserMiddleware} from './middleware/get-user.middleware';
import {CoursesController} from './courses/controllers/courses.controller';
import {LessonsController} from './courses/controllers/lessons.controller';

@Module({
  imports: [
    CoursesModule,
    AuthModule,
    MongooseModule.forRoot(MONGO_CONNECTION),
  ],

}) // NestModule needed only for Middleware
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer.apply(GetUserMiddleware).forRoutes(
      CoursesController,
      LessonsController
    );
  }
}
