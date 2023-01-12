import express from 'express';
import {
  passResetCtrl,
  signInCtrl,
  signUpCtrl,
} from '../controllers/users.controller.js';
import { checkJWT, reqValidation, wrapCtrl } from '../middleware/index.js';
import { signInJoiSchema, signUpJoiSchema } from '../models/joi/user.model.js';

const router = express.Router();

router.post('/signin', reqValidation(signInJoiSchema), wrapCtrl(signInCtrl));
router.post('/signup', reqValidation(signUpJoiSchema), wrapCtrl(signUpCtrl));
router.post('/password-reset', wrapCtrl(passResetCtrl));

router.use(checkJWT);
router.get('/current', (req, res) => {
  res.status(200).json({ message: 'get current user with data' });
});
router.get('/logout', (req, res) => {
  res.status(200).json({ message: 'Logout user' });
});
router.patch('/:userId/password', (req, res) => {
  res.status(200).json({ message: 'change user password' });
});
//TODO: added ctrl for notes
router.patch('/:userId', (req, res) => {
  res.status(200).json({ message: 'add notes for user' });
});

export { router as usersRouter };
