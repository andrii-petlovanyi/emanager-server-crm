import mongoose, { SchemaTypes } from 'mongoose';

const postSchema = mongoose.Schema(
  {
    model: {
      type: String,
      required: [true, 'Model is required! Please enter model'],
      unique: true,
    },
    info: {
      type: String,
      required: [true, 'Info is required! Please enter info'],
    },
    urlOffSite: {
      type: String,
      required: [true, 'URL is required! Please enter url'],
    },
    urlBook: {
      type: String,
      required: [true, 'URL is required! Please enter url'],
    },
    urlImg: {
      type: String,
      required: [true, 'URL is required! Please enter url'],
    },
    author: { type: SchemaTypes.ObjectId, ref: 'User' },
  },
  { versionKey: false, timestamps: true },
);

const Post = mongoose.model('Post', postSchema);
export { Post };
