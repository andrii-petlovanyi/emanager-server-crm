import {
  listOffers,
  offerById,
  removeOffer,
} from '../services/offers.service.js';

const listOffersCtrl = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const data = await listOffers(page, limit);

  res.status(200).json({ data, status: 'success' });
};

const offerByIdCtrl = async (req, res) => {
  const { offerId } = req.params;

  const data = await offerById(offerId);

  res.status(200).json({ data, status: 'success' });
};

const removeOfferCtrl = async (req, res) => {
  const { offerId } = req.params;

  await removeOffer(offerId);

  res.status(200).json({
    status: 'success',
    message: 'Offer deleted successfully!',
  });
};

export { listOffersCtrl, offerByIdCtrl, removeOfferCtrl };
