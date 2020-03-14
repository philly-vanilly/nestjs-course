import {Body, Controller, Get, Param, Put, Req, Res} from '@nestjs/common';
import {Course} from '../../../../shared/course';
import {CoursesRepository} from '../repositories/courses.repository';
import {Request, Response} from 'express';
// import {findAllCourses} from '../../../db-data';

@Controller('/courses')
export class CoursesController {
  constructor(
    private coursesRepository: CoursesRepository
  ) {}

  @Get('/hello-world')
  async helloWorld(
    // optionally, you can get direct access to underlying express-server instead of using mongoose-repository
    @Req() request: Request, // make sure the import is from express
    @Res() response: Response
  ): Promise<string> {
    // Note: once started in debug mode (npm run start:debug), you have to attach the debugger in Chrome before you can call the endpoint
    // chrome://inspect > Remote Targets > inspect the one with the port shown on startup
    // debugger;
    return 'Hello World'; // async will automatically wrap the non-promise return type into a promise
  }

  @Get()
  async findAllCourses(): Promise<Course[]> {
    // return findAllCourses();
    return this.coursesRepository.findAll();
  }

  @Put(':courseId')
  async updateCourse(
    @Param("courseId") courseId: string,
    @Body() changes: Partial<Course>
  ): Promise<Course> {
    // you should return the promise even if you don't use the value in order for
    // NestJS to terminate the ongoing request
    return this.coursesRepository.updateCourse(courseId, changes);
  }
}
