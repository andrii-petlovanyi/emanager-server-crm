import express from 'express';
import {
  listOffersCtrl,
  offerByIdCtrl,
  removeOfferCtrl,
} from '../controllers/offers.controller.js';
import { checkJWT, idValidation, wrapCtrl } from '../middleware/index.js';

const router = express.Router();

router.use(checkJWT);
router.get('/', wrapCtrl(listOffersCtrl));
router.get('/:offerId', idValidation, wrapCtrl(offerByIdCtrl));
router.delete('/:offerId', idValidation, wrapCtrl(removeOfferCtrl));

export { router as offersRouter };
