const authController = require("./auth.controller");

exports.login = async (req, res) => {
  try {
    res.json(await authController.login(req.body));
  } catch (e) {
    res.json(e);
  }
};

exports.register = async (req, res) => {
  try {
    res.json(await authController.register(req.body));
  } catch (e) {
    res.json(e);
  }
};

exports.getProfile = async (req, res) => {
  try {
    res.json(await authController.getProfile(req.query.id));
  } catch (e) {
    res.json(e);
  }
};

exports.updateProfile = async (req, res) => {
  try {
    res.json(await authController.updateProfile(req.body));
  } catch (e) {
    res.json(e);
  }
};
