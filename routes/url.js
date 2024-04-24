const express = require("express");
const {
  handleGenerateNewShortURL,
  makeIdFromShortID,
  handleGetAnalytics,
} = require("../controllers/url");

const router = express.Router();
router.post("/", handleGenerateNewShortURL);
router.get("/:shortId", makeIdFromShortID);
router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;
