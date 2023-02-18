const express = require("express");
const catchAsync = require("../utils/catch-async");
const Place = require("../models/place");

const router = express.Router();

router.post(
  "/",
  catchAsync(async (req, res) => {
    const { id, name, locationImages, description, coordinates, address } =
      req.body;

    const places = new Place({
      id,
      name,
      locationImages,
      description,
      coordinates,
      address,
    });
    await places.save();
    res.send({
      message: "장소 저장완료",
    });
  })
);

router.get(
  "/",
  catchAsync(async (req, res) => {
    const relatedPlaces = req.query.relatedPlaces;
    const places = await Place.find({
      _id: relatedPlaces,
    });

    res.send(places);
  })
);

module.exports = router;
