const scoreController = require("./score.controller");

exports.updateScore = async (req, res) => {
  try {
    res.json(await scoreController.updateScore(req.body));
  } catch (e) {
    res.json(e);
  }
};

exports.getUserScore = async (req, res) => {
  try {
    res.json(await scoreController.getUserScore(req.query.uuid));
  } catch (e) {
    res.json(e);
  }
};

exports.getTopPlayers = async (req, res) => {
  try {
    if (req.query.uuid) res.json(await scoreController.getTopPlayers(req.query.uuid));
    else res.json(await scoreController.getTopPlayers());
  } catch (e) {
    res.json(e);
  }
};

exports.setScore = async (req, res) => {
  try {
    res.json(await scoreController.setScore(req.body))
  } catch (e) { res.json(e) }
}
