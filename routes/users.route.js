import express from 'express';
import {
  changeNoteCtrl,
  changePassCtrl,
  getCurrentUserCtrl,
  logOutCtrl,
  passResetCtrl,
  signInCtrl,
  signUpCtrl,
} from '../controllers/users.controller.js';
import {
  checkJWT,
  idValidation,
  reqValidation,
  wrapCtrl,
} from '../middleware/index.js';
import {
  changeNoteSchema,
  changePasswordSchema,
  forgotPasswordSchema,
  signInJoiSchema,
  signUpJoiSchema,
} from '../validation/user.model.js';

const router = express.Router();

router.post('/signin', reqValidation(signInJoiSchema), wrapCtrl(signInCtrl));
router.post('/signup', reqValidation(signUpJoiSchema), wrapCtrl(signUpCtrl));
router.post(
  '/password-reset',
  reqValidation(forgotPasswordSchema),
  wrapCtrl(passResetCtrl),
);

router.use(checkJWT);
router.get('/current', wrapCtrl(getCurrentUserCtrl));
router.get('/logout', wrapCtrl(logOutCtrl));
router.patch(
  '/:userId/password',
  idValidation,
  reqValidation(changePasswordSchema),
  wrapCtrl(changePassCtrl),
);
//TODO: added ctrl for notes
router.patch(
  '/:userId/note',
  idValidation,
  reqValidation(changeNoteSchema),
  wrapCtrl(changeNoteCtrl),
);

export { router as usersRouter };
