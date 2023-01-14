import express from 'express';
import {
  addArchivePostCtrl,
  archivePostByIdCtrl,
  listArchiveCtrl,
  moveArchivePostCtrl,
  removeArchivePostCtrl,
} from '../controllers/archive.controller.js';
import {
  checkJWT,
  idValidation,
  reqValidation,
  wrapCtrl,
} from '../middleware/index.js';
import { archiveAddPostJoiSchema } from '../models/joi/archive.model.js';

const router = express.Router();

router.use(checkJWT);
router.get('/', wrapCtrl(listArchiveCtrl));
router.get('/:archivePostId', idValidation, wrapCtrl(archivePostByIdCtrl));
router.post(
  '/',
  reqValidation(archiveAddPostJoiSchema),
  wrapCtrl(addArchivePostCtrl),
);
router.delete('/:archivePostId', idValidation, wrapCtrl(removeArchivePostCtrl));
router.delete(
  '/:archivePostId/move',
  idValidation,
  wrapCtrl(moveArchivePostCtrl),
);

export { router as archiveRouter };
