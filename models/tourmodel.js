const mangoose = require('mongoose');

const tourSchema = new mangoose.Schema({
  name: {
    type: String,
    required: [true, 'A TOUR MUST HAVE A NAME'],
    unique: true,
  },
  avgRatings: {
    type: Number,
    default: 4.5,
  },
  rantingsNumbers: {
    type: Number,
    default: 4.5,
  },
  duration: {
    type: Number,
    required: [true, 'A TOUR MUST HAVE A DURATION'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A TOUR MUST HAVE A GROUP SIZE'],
  },
  difficulty: {
    type: String,
    required: [true, 'A TOUR MUST HAVE DIFFICUTLY LEVEL'],
  },
  price: {
    type: Number,
    required: [true, 'A TOUR MUST HAVE A PRICE'],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
    required: [true, 'A TOUR MUST HAVE A SUMMARY'],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    selected: false,
  },
  StartDate: { type: [Date], selected: false },
});

const Tour = mangoose.model('Tour', tourSchema);
module.exports = Tour;
