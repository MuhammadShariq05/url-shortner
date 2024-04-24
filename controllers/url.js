const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ msg: "URL is required" });

  const shortId = shortid.generate();
  try {
    await URL.create({
      shortId: shortId,
      redirectURL: body.url,
      visitHistory: [],
    });
    return res.render("home", { id: shortId })
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}

async function makeIdFromShortID(req, res) {
  const shortId = req.params.shortId;
  try {
    const entry = await URL.findOneAndUpdate(
      { shortId },
      { $push: { visitHistory: { timestamp: Date.now() } } },
      { new: true } // Return the updated document
    );

    if (!entry) {
      return res.status(404).json({ msg: "URL not found" });
    }

    return res.redirect(entry.redirectURL);
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}

async function handleGetAnalytics(req, req) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({
    shortId,
  });
  return res.json({
    totalClicks: result.visitHistory.lenght,
    analytics: result.visitHistory,
  });
}

module.exports = {
  handleGenerateNewShortURL,
  makeIdFromShortID,
  handleGetAnalytics,
};
