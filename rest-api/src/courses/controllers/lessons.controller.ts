import {BadRequestException, Controller, Get, ParseIntPipe, Query} from '@nestjs/common';
import {LessonsRepository} from '../repositories/lessons.repository';

@Controller('lessons')
export class LessonsController {
  constructor(
    private lessonsRepository: LessonsRepository
  ) {}

  @Get()
  public searchByUrl( // async is redundant because return type is already a promise
    @Query('courseId') courseId: string,
    @Query('sortOrder') sortOrder = "asc",
    // coming from url you would receive only strings as values!
    @Query('pageNumber', ParseIntPipe) pageNumber = 0,
    @Query('pageSize', ParseIntPipe) pageSize = 3
  ) {
    if (!courseId) {
      throw new BadRequestException("courseId must be defined!");
    }

    if (sortOrder !== 'asc' && sortOrder !== 'desc') {
      throw new BadRequestException("sortOrder must be asc or desc");
    }
    return this.lessonsRepository.searchLessons(courseId, sortOrder, pageNumber, pageSize);
  }
}
