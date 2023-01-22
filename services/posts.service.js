import { ConflictError, CustomError } from '../helpers/index.js';
import { Post } from '../models/post.model.js';

const listPosts = async (page, limit) => {
  const skip = (page - 1) * limit;
  const posts = await Post.find({}, '', {
    skip,
    limit: Number(limit),
  })
    .sort([['updatedAt', -1]])
    .populate('author', '_id name');
  const totalPosts = await Post.count();

  return { posts, totalPosts };
};

const postById = async postId => {
  const post = await Post.findById(postId).populate('author', '_id name');

  if (!post) throw new CustomError(`Offer with id: ${postId} not found`);

  return post;
};

const addPost = async (id, body) => {
  const isAdded = await Post.findOne({ model: body.model });
  if (isAdded)
    throw new ConflictError(
      `Model ${body.model} is already available in database!`,
    );

  const newPost = Post.create({
    ...body,
    model: body.model.toLowerCase(),
    author: id,
  });
  return newPost;
};

const updatePost = async (postId, body) => {
  const updatedPost = await Post.findByIdAndUpdate(postId, body, {
    new: true,
    runValidators: true,
  });

  if (!updatedPost) throw new CustomError(`Post with id: ${postId} not found`);

  return updatedPost;
};

const removePost = async postId => {
  const data = await Post.findByIdAndDelete(postId);
  if (!data) throw new CustomError(`Offer with id: ${postId} not found`);

  return;
};

export { listPosts, postById, removePost, addPost, updatePost };
