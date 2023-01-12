import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'all archive' });
});
router.post('/', (req, res) => {
  res.status(201).json({ message: 'add to archive' });
});
router.get('/:postId', (req, res) => {
  res.status(200).json({ message: 'one post in archive' });
});
router.delete('/:postId', (req, res) => {
  res.status(200).json({ message: 'delete from archive' });
});

export { router as archiveRouter };
