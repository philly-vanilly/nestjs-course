import {Injectable} from '@nestjs/common';
import {Course} from '../../../../shared/course';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';

@Injectable()
export class CoursesRepository {
  constructor(
    // model is not a regular provider but in MongooseModule.forFeature() call,
    // so it needs additional Decorator
    @InjectModel('Course') private courseModel: Model<Course>
  ) {}

  async findAll(): Promise<Course[]> {
    return this.courseModel.find();
  }

  async updateCourse(courseId: string, changes: Partial<Course>): Promise<Course> {
    return this.courseModel.findOneAndUpdate(
      {_id: courseId},
      changes,
      { new: true } // return the updated object
    );
  }
}
