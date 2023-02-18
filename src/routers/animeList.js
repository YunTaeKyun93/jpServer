const express = require("express");
const Anime = require("../models/anime");
const catchAsync = require("../utils/catch-async");
const RelatedPlace = require("../models/relatedPlace");
const Place = require("../models/place");
const router = express.Router();

router.post(
  "/",
  catchAsync(async (req, res) => {
    const { id, title, story, images } = req.body;
    const animeList = new Anime({
      id,
      title,
      story,
      images,
    });
    await animeList.save();
    res.send({
      message:'애니메이션 저장완료'
    });
  })
);


module.exports = router;