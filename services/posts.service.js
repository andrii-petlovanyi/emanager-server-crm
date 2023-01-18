import { CustomError } from '../helpers/index.js';
import { Post } from '../models/mongoose/post.model.js';

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
  const newPost = Post.create({ ...body, author: id });
  return newPost;
};

const updatePost = async (postId, body) => {
  const updatedPost = await Post.findByIdAndUpdate(postId, body, {
    new: true,
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
