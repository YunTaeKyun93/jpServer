const express = require("express");
const Anime = require("../models/anime");
const catchAsync = require("../utils/catch-async");
const Place = require("../models/place");
const RelatedPlace = require("../models/relatedPlace");
const mongoose = require("mongoose");

const router = express.Router();

router.post(
  "/",
  catchAsync(async (req, res) => {
    const { anime, place, relatedPlaceImage } = req.body;
    const animeID = mongoose.Types.ObjectId(anime);
    const placeID = mongoose.Types.ObjectId(place);
    // const anime = await Anime.findById({ animeID }).exec();
    // const place = await Place.findById({ placeID }).exec();
    const matchingAnime = await Anime.findById(animeID).exec();
    const matchingPlace = await Place.findById(placeID).exec();

    const checkAnimeId =
      (await Anime.countDocuments({ _id:animeID })) ==
      1;
    const checkPlaceId =
      (await Place.countDocuments({ _id: placeID })) ==
      1;
    if (!checkAnimeId) {
      res.status(401).send({
        errorMessage: "해당 ID를 가진 애니메이션을 찾을 수 없습니다"
      });
    }
    if (!checkPlaceId) {
      res.status(401).send({
        errorMessage: "해당 ID를 가진 장소를 찾을 수 없습니다"
      });
    }

    const relatedPlace = new RelatedPlace({
      anime: matchingAnime._id,
      place: matchingPlace._id,
      relatedPlaceImage
    });
    await relatedPlace.save();
    res.send({
      message: "관련장소 저장 완료"
    });
  })
);

router.get(
  "/:id",
  catchAsync(async (req, res) => {
    const place = req.params.id;
    const relatedPlace = await RelatedPlace.findOne({
      place
    }).exec();
    res.send(relatedPlace);
  })
);

module.exports = router;
