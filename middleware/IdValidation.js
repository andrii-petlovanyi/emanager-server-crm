import { isValidObjectId } from 'mongoose';

import { CustomError } from '../helpers/index.js';

const idValidation = (req, _, next) => {
  const { postId, offerId, archivePostId, userId } = req.params;

  const resultPost = isValidObjectId(postId);
  const resultOffer = isValidObjectId(offerId);
  const resultArchive = isValidObjectId(archivePostId);
  const resultUser = isValidObjectId(userId);

  if (!resultPost && !resultOffer && !resultArchive && !resultUser) {
    next(new CustomError('Invalid id format'));
  }
  next();
};

export { idValidation };
