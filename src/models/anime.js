const mongoose = require("mongoose");
const imagesSchema = require("./schemas/images");

const animeSchema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    images: [imagesSchema],
    story: { type: String, require: true }
  },
  { timestamps: true }
);

const Anime = mongoose.model("anime", animeSchema);
module.exports = Anime;
