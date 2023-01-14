import {
  addPost,
  listPosts,
  postById,
  removePost,
  updatePost,
} from '../services/posts.service.js';

const listPostsCtrl = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const data = await listPosts(page, limit);

  res.status(200).json({ status: 'success', code: 200, data });
};

const postByIdCtrl = async (req, res) => {
  const { postId } = req.params;

  const data = await postById(postId);

  res.status(200).json({ status: 'success', code: 200, data });
};

const addPostCtrl = async (req, res) => {
  const body = req.body;
  const { id } = req.user;

  const data = await addPost(id, body);

  res.status(201).json({
    status: 'success',
    code: 201,
    message: 'Post created successfully!',
    data,
  });
};

const updatePostCtrl = async (req, res) => {
  const { postId } = req.params;
  const body = req.body;

  const data = await updatePost(postId, body);

  res.status(200).json({
    status: 'success',
    code: 200,
    message: 'Post updated successfully!',
    data,
  });
};

const removePostCtrl = async (req, res) => {
  const { postId } = req.params;

  await removePost(postId);

  res.status(200).json({
    status: 'success',
    message: 'Post deleted successfully!',
  });
};

export {
  listPostsCtrl,
  postByIdCtrl,
  removePostCtrl,
  addPostCtrl,
  updatePostCtrl,
};
