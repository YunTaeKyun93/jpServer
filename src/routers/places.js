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
      coordinates
    });
    await places.save();
    res.send({
      message: "장소 저장완료"
    });
  })
);

router.get(
  "/:id",
  catchAsync(async (req, res) => {
    const placeId = req.params.id;
    if (placeId == null) return;
    const place = await Place.findById({ _id: placeId });

    if (place == null) {
      console.log("This is null!");
      res.status(404).end();
      return;
    }

    res.send(place);
  })
);

module.exports = router;
