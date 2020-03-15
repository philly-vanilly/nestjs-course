import * as mongoose from 'mongoose';

export const LessonsSchema = new mongoose.Schema({
  // the real object also has the Mongo-typical _id property, here it is implicit
  description: String,
  duration: String,
  seqNo: Number,
  course: { // one to many relationship by object-identifier
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }
});
