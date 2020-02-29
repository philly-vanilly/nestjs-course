import {Controller, Get} from '@nestjs/common';

@Controller()
export class CoursesController {
  @Get('/api/hello-world')
  async helloWorld(): Promise<string> { // async will automatically wrap the string into a promise
    return 'Hello World';
  }


}
