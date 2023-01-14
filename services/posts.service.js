import { CustomError } from '../helpers/index.js';
import { Post } from '../models/mongoose/post.model.js';

const listPosts = async (page, limit) => {
  const skip = (page - 1) * limit;
  const offers = await Post.find({}, '', {
    skip,
    limit: Number(limit),
  }).populate('author', '_id name');

  return offers;
};

const postById = async postId => {
  const offer = await Post.findById(postId).populate('author', '_id name');

  if (!offer) throw new CustomError(`Offer with id: ${postId} not found`);

  return offer;
};

const addPost = async (id, body) => {
  const newPost = Post.create({ ...body, author: id }).populate(
    'author',
    '_id name',
  );
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
