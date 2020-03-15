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

  public async createCourse(course: Partial<Course>): Promise<Course> {
    // return this.courseModel.create(course);
    const newCourse = this.courseModel(course); // object created and validated but exists only in memory, not in DB
    await newCourse.save();
    return newCourse.toObject({versionKey: false}); // strip version property
  }

  public async findAll(): Promise<Course[]> {
    return this.courseModel.find();
  }

  public async findCourseByUrl(url: string): Promise<Course> {
    return this.courseModel.findOne({url});
  }

  public async updateCourse(courseId: string, changes: Partial<Course>): Promise<Course> {
    return this.courseModel.findOneAndUpdate(
      {_id: courseId},
      changes,
      { new: true } // return the updated object
    );
  }

  public async deleteCourse(courseId: string): Promise<void> {
    return this.courseModel.deleteOne(
      {_id: courseId},
    );
  }
}
