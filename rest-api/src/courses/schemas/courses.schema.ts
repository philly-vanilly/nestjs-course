import * as mongoose from 'mongoose';

/*
* In MongoDB you can add new properties to individual objects without having to re-index the whole database. So it is schema-less.
* However, Mongoose enforces schema-like capabilities. It provides object-modeling and might cause errors on unexpected properties.
*
* Also, follows active record pattern: provides Promise (success/fail) on save() and other operations to DB
* */
export const CoursesSchema = new mongoose.Schema({
  // the real object also has the Mongo-typical _id property, here it is implicit
  seqNo: Number,
  url: String,
  iconUrl: String,
  courseListIcon: String,
  description: String,
  longDescription: String,
  category: String,
  lessonsCount: Number,
  promo: Boolean,
});
