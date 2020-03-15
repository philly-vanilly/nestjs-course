import {IsBoolean, IsInt, IsMongoId, IsString} from 'class-validator';

// for using validation decorators, needs to be a class
// in order to activate the validation, do app.useGlobalPipes(new ValidationPipe()); during bootstrap
// also, you might want to remove th
export class Course {
  @IsString() @IsMongoId() _id: string;
  @IsInt({message: 'seqNo must be numeric'}) seqNo: number;
  @IsString() url: string;
  @IsString() iconUrl: string;
  @IsString() courseListIcon: string;
  // check for mandatory properties can be ignored by new ValidationPipe({skipMissingProperties: true})
  @IsString({always: false}) description: string;
  @IsString({always: false}) longDescription: string;
  @IsString() category: string;
  @IsInt() lessonsCount: number;
  @IsBoolean() promo: boolean;
}


export function compareCourses(c1:Course, c2: Course) {

  const compare = c1.seqNo - c2.seqNo;

  if (compare > 0) {
    return 1;
  }
  else if ( compare < 0) {
    return -1;
  }
  else return 0;

}
