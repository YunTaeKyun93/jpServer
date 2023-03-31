const express = require("express");
const catchAsync = require("../utils/catch-async");
const Manhole = require("../models/manhole");

const router = express.Router();

router.post(
  "/",
  catchAsync(async (req, res) => {
    const { id, name, jpName, bannerImage, images, address, description } =
      req.body;
    const manholes = new Manhole({
      id,
      name,
      jpName,
      bannerImage,
      images,
      address,
      description
    });
    await manholes.save();
    res.send({ message: "맨홀 저장완료" });
  })
);

router.get(
  "/",
  catchAsync(async (req, res) => {
    const manholes = await Manhole.find().exec();
    if (manholes == null) {
      res.status(404).end();
    }
    res.send(manholes);
  })
);

router.get(
  "/:id",
  catchAsync(async (req, res) => {
    const manholeId = req.params.id;
    const manhole = await Manhole.findById({ _id: manholeId }).exec();
    if (manhole == null) {
      res.status(404).end();
    }
    res.send(manhole);
  })
);

module.exports = router;
