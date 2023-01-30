import express from 'express';
import {
  changeEmailCtrl,
  changeNoteCtrl,
  changePassCtrl,
  clearNotificationsCtrl,
  countNotificationsCtrl,
  currentUserCtrl,
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
router.get('/current', wrapCtrl(currentUserCtrl));
router.get('/logout', wrapCtrl(logOutCtrl));
router.patch(
  '/:userId/password',
  idValidation,
  reqValidation(changePasswordSchema),
  wrapCtrl(changePassCtrl),
);
router.patch(
  '/:userId/note',
  idValidation,
  reqValidation(changeNoteSchema),
  wrapCtrl(changeNoteCtrl),
);
router.patch(
  '/:userId/email',
  idValidation,
  reqValidation(forgotPasswordSchema),
  wrapCtrl(changeEmailCtrl),
);
router.get('/notification', wrapCtrl(countNotificationsCtrl));
router.patch('/notification', wrapCtrl(clearNotificationsCtrl));

export { router as usersRouter };
