import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseFilters
} from '@nestjs/common';
import {Course} from '../../../../shared/course';
import {CoursesRepository} from '../repositories/courses.repository';
import {Request, Response} from 'express';
import {ToIntegerPipe} from '../pipes/to-integer.pipe';
// import {HttpExceptionFilter} from '../../filters/http-exception.filter';

@Controller('/courses')
// @UseFilters(new HttpExceptionFilter())
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

  @Post()
  async createCourse(
    @Body() course: Partial<Course> // partial because full Course has an id which is generated by the db
  ): Promise<Course> {
    console.log("creating new course");
    return this.coursesRepository.createCourse(course);
  }

  @Get()
  async findAllCourses(): Promise<Course[]> {
    console.log("getting all courses");
    // import {findAllCourses} from '../../../db-data';
    // return findAllCourses();
    return this.coursesRepository.findAll();
  }

  @Get(":courseUrl")
  async findCoursebyUrl(
    @Param("courseUrl") url: string
  ): Promise<Course> {
    console.log("getting course with url: " + url);
    const course = await this.coursesRepository.findCourseByUrl(url);

    if (!course) {
      throw new NotFoundException("Could not find course for url: " + url);
    }

    // async will automatically wrap response in a promise
    return course;
  }

  @Put(':courseId')
  // @UseFilters(new HttpExceptionFilter())
  async updateCourse(
    @Param("courseId") courseId: string,
    // might as well use ParseIntPipe from NestJS or let Mongoose do the casting
    // (sometimes you want to do the casting before repository layer though)
    // @Body("seqNo", ToIntegerPipe) seqNo: string,
    // @Body() changes: Partial<Course> // if you use Partial, ValidationException will not be thrown!
    @Body() changes: Course
  ): Promise<Course> {
    // you should return the promise even if you don't use the value in order for
    // NestJS to terminate the ongoing request
    console.log(`updating course ${courseId}`);

    if (changes._id) {
      // throw new HttpException("Can't update course id", 400); // generic Express exception
      // see also: https://docs.nestjs.com/exception-filters
      throw new BadRequestException("Can't update course id");
    }

    return this.coursesRepository.updateCourse(courseId, changes);
  }

  @Delete(':courseId')
  async deleteCourse(
    @Param("courseId") courseId: string,
  ): Promise<void> {
    console.log(`deleting course ${courseId}`);
    return this.coursesRepository.deleteCourse(courseId);
  }
}
