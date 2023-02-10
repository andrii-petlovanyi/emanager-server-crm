import { CustomError } from '../helpers/index.js';
import { Archive } from '../models/archive.model.js';
import { Post } from '../models/post.model.js';

const listArchive = async (page, limit, search) => {
  const skip = (page - 1) * limit;
  const archivePosts = search
    ? await Archive.find({ model: { $regex: `${search}` } }, '', {
        skip,
        limit: Number(limit),
      })
        .sort([['updatedAt', -1]])
        .populate('author', '_id name')
    : await Archive.find({}, '', {
        skip,
        limit: Number(limit),
      })
        .sort([['updatedAt', -1]])
        .populate('author', '_id name');

  const totalArchivePosts = search
    ? await Archive.count({ model: { $regex: `${search}` } })
    : await Archive.count();

  return { archivePosts, totalArchivePosts };
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
