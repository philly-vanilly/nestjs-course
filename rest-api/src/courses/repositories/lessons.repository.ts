import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Lesson} from '../../../../shared/lesson';
import {Model} from 'mongoose';

@Injectable()
export class LessonsRepository {
  constructor(
    @InjectModel('Lesson') private lessonsModel: Model<Lesson>
  ) {}

  // if find does not produce results, the Schema might be wrong,
  // it seems it does not verify that a param does not exist
  public searchLessons(
    courseId: string,
    sortOrder: "asc" | "desc",
    pageNumber: number,
    pageSize: number
  ): Promise<Lesson> {
    console.log("searching for lessons: ", courseId, sortOrder, pageNumber, pageSize);
    return this.lessonsModel.find(
      // filter criteria (more possible):
      // better set this to Partial<Lesson> to avoid property mismatch
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
