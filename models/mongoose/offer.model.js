import mongoose from 'mongoose';

const offerSchema = mongoose.Schema(
  {
    model: {
      type: String,
      required: [true, 'Model is required! Please enter model'],
      unique: true,
    },
    FirstName: { type: String },
    LastName: { type: String },
  },
  { versionKey: false, timestamps: true },
);

const Offer = mongoose.model('Offer', offerSchema);
export { Offer };
