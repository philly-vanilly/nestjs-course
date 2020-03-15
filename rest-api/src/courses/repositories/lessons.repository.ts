import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Lesson} from '../../../../shared/lesson';
import {Model} from 'mongoose';

@Injectable()
export class LessonsRepository {
  constructor(
    @InjectModel('Lesson') private lessonsModel: Model<Lesson>
  ) {}

  public searchLessons(
    courseId: string,
    sortOrder: "asc" | "desc",
    pageNumber: number,
    pageSize: number
  ): Promise<Lesson> {
    console.log("searching for lessons: " + courseId, sortOrder, pageNumber, pageSize);
    return this.lessonsModel.find(
      // filter criteria (more possible):
      {course: courseId},
      // fields to return; null for all
      null,
      {
        limit: pageSize,
        skip: pageNumber * pageSize,
        sort: {
          seqNo: sortOrder
        }
      }
    );
  }
}
