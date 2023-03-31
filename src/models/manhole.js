const mongoose = require("mongoose");
const imagesSchema = require("./schemas/images");

const manholeScema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    jpName: { type: String },
    bannerImage: { type: Object },
    images: [imagesSchema],
    address: { type: String, require: true },
    description: { type: String, require: true },
    description2: { type: String, require: true }
  },
  { timestamps: true }
);

const Manhole = mongoose.model("manhole", manholeScema);
module.exports = Manhole;
