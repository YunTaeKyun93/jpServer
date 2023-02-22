const express = require("express");
const catchAsync = require("../utils/catch-async");
const Place = require("../models/place");

const router = express.Router();

router.post(
  "/",
  catchAsync(async (req, res) => {
    const { id, name, images, description, coordinates } = req.body;
    const places = new Place({
      id,
      name,
      images,
      description,
      coordinates,
    });
    await places.save();
    res.send({
      message:"장소 저장완료"
    });
  })
);

router.get(
  "/",
  catchAsync(async (req, res) => {
    const relatedPlaces = req.query.placeId;
    const places = await Place.find({
      _id:relatedPlaces
    })
    
    res.send(places);
  })
);

module.exports = router;
