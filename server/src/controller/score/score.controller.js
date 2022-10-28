const { ScoreModel, UserModel } = require("../../model");

exports.getUserScore = async (uuid) => {
  let scoreUser = await UserModel.findOne({ uuid }).lean();
  return await ScoreModel.find({ _id: scoreUser.score });
};

exports.getTopPlayers = async (uuid) => {
  let scores = await ScoreModel.aggregate([
    { $addFields: { intNumbers: { $toInt: "$points" } } },
    { $sort: { intNumbers: -1 } },
    { $project: { _id: 1, points: 1, mode: 1 } },
  ]);

  let ranking = {
    normal: [],
    speed: [],
    hard: [],
  };

  await Promise.allSettled(
    scores.map(async (e, i) => {
      if (ranking[e.mode].length < 3) {
        ranking[e.mode].push({
          ...e,
          user: Object(await UserModel.findOne({ score: e._id }).lean())
            .username,
          position: i
        });
      }
    })
  );

  return ranking;
};

exports.updateScore = async (newScore) => {
  // let id = ScoreModel.insertOne({
  //     score: "5",
  //     mode: "normal"
  // })

  // return id

  let user = await UserModel.findOne({ uuid: newScore.uuid })
    .populate("score")
    .lean();

  let oldScore = user.score.filter((e) => e.mode == newScore.mode)[0];

  if (parseInt(oldScore.points) < parseInt(newScore.score)) {
    return await ScoreModel.updateOne(
      { _id: oldScore._id },
      { $set: { points: `${newScore.score}` } }
    );
  } else {
    return { message: "Nuevo Score inferior al anterior" };
  }
};
