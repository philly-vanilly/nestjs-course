import {Module} from '@nestjs/common';
import {CoursesModule} from './courses/courses.module';
import {MongooseModule} from '@nestjs/mongoose';
import {MONGO_CONNECTION} from '../../env';

@Module({
  imports: [
    CoursesModule,
    MongooseModule.forRoot(MONGO_CONNECTION),
  ],

})
export class AppModule {

}
