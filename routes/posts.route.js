import express from 'express';
import {
  addPostCtrl,
  listPostsCtrl,
  postByIdCtrl,
  removePostCtrl,
  updatePostCtrl,
} from '../controllers/posts.controller.js';
import {
  checkJWT,
  wrapCtrl,
  idValidation,
  reqValidation,
} from '../middleware/index.js';
import { postJoiSchema } from '../models/joi/post.model.js';

const router = express.Router();

router.use(checkJWT);
router.get('/', wrapCtrl(listPostsCtrl));
router.get('/:postId', idValidation, wrapCtrl(postByIdCtrl));
router.delete('/:postId', idValidation, wrapCtrl(removePostCtrl));
router.post('/', reqValidation(postJoiSchema), wrapCtrl(addPostCtrl));
router.put(
  '/:postId',
  idValidation,
  reqValidation(postJoiSchema),
  wrapCtrl(updatePostCtrl),
);

//TODO: add search for model

export { router as postsRouter };
