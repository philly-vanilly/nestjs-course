import {Controller, Get} from '@nestjs/common';
import {Course} from '../../../shared/course';
import {findAllCourses} from '../../db-data';

@Controller()
export class CoursesController {
  @Get('/api/hello-world')
  async helloWorld(): Promise<string> { // async will automatically wrap the string into a promise
    return 'Hello World';
  }

  @Get('/api/courses')
  async findAllCourses(): Promise<Course[]> { // async will automatically wrap the string into a promise
    // Note: once started in debug mode (npm run start:debug), you have to attach the debugger in Chrome before you can call the endpoint
    // chrome://inspect > Remote Targets > inspect the one with the port shown on startup
    // debugger;

    return findAllCourses();
  }
}
