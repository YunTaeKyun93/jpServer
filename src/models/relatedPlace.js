const mongoose = require("mongoose");

const imagesSchema = require("./schemas/images");

const relatedPlaceSchema = new mongoose.Schema({
  place: {
    type: mongoose.Types.ObjectId,
    required: true
  },

  anime: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  relatedPlaceImage: [imagesSchema]
});

relatedPlaceSchema.index({ anime: 1, place: 1 }, { unique: true });
const relatedPlace = mongoose.model("relatedPlaces", relatedPlaceSchema);

module.exports = relatedPlace;
