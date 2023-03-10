import { CustomError } from '../helpers/errors.js';
import { Offer } from '../models/offer.model.js';

const listOffers = async (page, limit) => {
  const skip = (page - 1) * limit;
  const offers = await Offer.find({}, '', {
    skip,
    limit: Number(limit),
  }).sort([['date', -1]]);
  const totalOffers = await Offer.count();

  return { offers, totalOffers };
};

const offerById = async offerId => {
  const offer = await Offer.findById(offerId);

  if (!offer) throw new CustomError(`Offer with id: ${offerId} not found`);

  return offer;
};

const removeOffer = async offerId => {
  const data = await Offer.findByIdAndDelete(offerId);
  if (!data) throw new CustomError(`Offer with id: ${offerId} not found`);

  return;
};

export { listOffers, offerById, removeOffer };
