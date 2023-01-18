import { CustomError } from '../helpers/index.js';
import { Archive } from '../models/mongoose/archive.model.js';
import { Post } from '../models/mongoose/post.model.js';

const listArchive = async (page, limit) => {
  const skip = (page - 1) * limit;
  const archive = await Archive.find({}, '', {
    skip,
    limit: Number(limit),
  })
    .sort([['updatedAt', -1]])
    .populate('author', '_id name');

  return archive;
};

const archivePostById = async archivePostId => {
  const archive = await Archive.findById(archivePostId);

  if (!archive)
    throw new CustomError(`Archive post with id: ${archivePostId} not found`);

  return archive;
};

const addArchivePost = async postId => {
  const post = await Post.findOneAndDelete({ _id: postId })
    .select('model info urlOffSite urlBook urlImg author')
    .exec();

  if (!post) throw new CustomError(`Post with id: ${postId} not found`);

  let objPost = post.toObject();
  delete objPost._id;

  const newArchivePost = Archive.create(objPost);
  return newArchivePost;
};

const removeArchivePost = async archivePostId => {
  const data = await Archive.findByIdAndDelete(archivePostId);
  if (!data)
    throw new CustomError(`Archive post with id: ${archivePostId} not found`);

  return;
};

const moveArchivePost = async archivePostId => {
  const post = await Archive.findOneAndDelete({ _id: archivePostId })
    .select('model info urlOffSite urlBook urlImg author')
    .exec();

  if (!post)
    throw new CustomError(`Archive post with id: ${archivePostId} not found`);

  let objPost = post.toObject();
  delete objPost._id;

  const newPost = Post.create(objPost);
  return newPost;
};

export {
  listArchive,
  addArchivePost,
  archivePostById,
  removeArchivePost,
  moveArchivePost,
};
