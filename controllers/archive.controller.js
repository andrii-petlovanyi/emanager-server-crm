import {
  addArchivePost,
  archivePostById,
  listArchive,
  moveArchivePost,
  removeArchivePost,
} from '../services/archive.service.js';

const listArchiveCtrl = async (req, res) => {
  const { page = 1, limit = 10, search } = req.query;

  const { archivePosts, totalArchivePosts } = await listArchive(
    page,
    limit,
    search,
  );

  res.status(200).json({
    status: 'success',
    code: 200,
    archivePosts,
    totalArchivePosts,
  });
};

const archivePostByIdCtrl = async (req, res) => {
  const { archivePostId } = req.params;

  const data = await archivePostById(archivePostId);

  res.status(200).json({ status: 'success', code: 200, data });
};

const addArchivePostCtrl = async (req, res) => {
  const { postId } = req.body;

  const data = await addArchivePost(postId);

  res.status(201).json({
    status: 'success',
    code: 201,
    message: 'Post moved to archive successfully!',
    data,
  });
};

const removeArchivePostCtrl = async (req, res) => {
  const { archivePostId } = req.params;
  await removeArchivePost(archivePostId);

  res.status(200).json({
    status: 'success',
    code: 200,
    message: 'Archive post removed successfully!',
  });
};

const moveArchivePostCtrl = async (req, res) => {
  const { archivePostId } = req.params;

  await moveArchivePost(archivePostId);

  res.status(200).json({
    status: 'success',
    code: 200,
    message: 'Archive post moved to post list successfully!',
  });
};

export {
  listArchiveCtrl,
  addArchivePostCtrl,
  removeArchivePostCtrl,
  archivePostByIdCtrl,
  moveArchivePostCtrl,
};
