const mongoose = require("mongoose");
const coordinatesSchema = require("./schemas/coodinates");
const imagesSchema = require("./schemas/images");

const placeSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    locationImages: [imagesSchema],
    coordinates: coordinatesSchema,

    description: { type: String },
    address: { type: String },
  },
  {
    timestamps: true,
  }
);
const Place = mongoose.model("place", placeSchema);

module.exports = Place;
