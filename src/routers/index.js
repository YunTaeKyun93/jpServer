const express = require("express");

const animeListRouter = require("./animeList");
const placesRouter = require("./places");
const relatedPlaceRouter = require("./relatedPlaces");
const manholesRouter = require("./manholes");
const router = express.Router();
router.use("/animeList", animeListRouter);
router.use("/places", placesRouter);
router.use("/relatedPlaces", relatedPlaceRouter);
router.use("/manholes", manholesRouter);
module.exports = router;
