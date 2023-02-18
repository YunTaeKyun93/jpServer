const mongoose = require("mongoose");
const coordinatesSchema = require("./schemas/coodinates");
const imagesSchema = require("./schemas/images");

const placeSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    locationImages: [imagesSchema],
    description: { type: String },
    coordinates: coordinatesSchema
  },
  {
    timestamps: true
  }
);
const Place = mongoose.model("place", placeSchema);

module.exports = Place;
