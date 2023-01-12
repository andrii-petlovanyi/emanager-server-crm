import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'all posts' });
});
router.post('/', (req, res) => {
  res.status(201).json({ message: 'create posts' });
});
router.get('/:postId', (req, res) => {
  res.status(200).json({ message: 'get one post' });
});
router.patch('/:postId', (req, res) => {
  res.status(200).json({ message: 'change posts' });
});
router.delete('/:postId', (req, res) => {
  res.status(200).json({ message: 'delete all posts' });
});

export { router as postsRouter };
