import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'all offers' });
});
router.get('/:offerId', (req, res) => {
  res.status(200).json({ message: 'get one offer' });
});
router.delete('/:postId', (req, res) => {
  res.status(200).json({ message: 'delete all offer' });
});

export { router as offersRouter };
