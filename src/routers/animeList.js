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
      images
    });
    await animeList.save();
    res.send({
      message: "애니메이션 저장완료"
    });
  })
);
const readRelatedPlaceIds = async (animeId) => {
  // 관련있는 플레이스를 가져옴.
  const relatedPlaceRelations = await RelatedPlace.find({
    anime: animeId
  }).exec();
  const relatedPlaceIds = relatedPlaceRelations.map(
    (relation) => relation.place
  );

  return relatedPlaceIds;
};
const serialize = async (anime) => {
  return {
    id: anime._id.toString(),
    _id: anime._id,
    title: anime.title,
    images: anime.images,
    story: anime.story,

    relatedPlaces: (await readRelatedPlaceIds(anime._id)).map((id) =>
      id.toString()
    )
  };
};

router.get(
  "/",
  catchAsync(async (req, res) => {
    const animeList = await Anime.find().exec();
    res.send(await Promise.all(animeList.map(serialize)));
  })
);

router.get(
  "/:animeId",
  catchAsync(async (req, res) => {
    const anime = await Anime.findById(req.params.animeId);
    res.send(await serialize(anime));
  })
);

module.exports = router;
