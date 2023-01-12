import express from 'express';

const router = express.Router();

router.post('/signin', (req, res) => {
  res.status(200).json({ message: 'hello' });
});
router.post('/signup', (req, res) => {
  res.status(201).json({ message: 'hello' });
});
router.post('password', (req, res) => {
  res.status(200).json({ message: 'send email with new password' });
});

router.get('current', (req, res) => {
  res.status(200).json({ message: 'get current user with data' });
});
router.get('logout', (req, res) => {
  res.status(200).json({ message: 'Logout user' });
});
router.patch('password', (req, res) => {
  res.status(200).json({ message: 'change user password' });
});

export { router as usersRouter };
