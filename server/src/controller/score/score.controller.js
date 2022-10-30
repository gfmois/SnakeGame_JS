const { ScoreModel, UserModel } = require("../../model");

exports.getUserScore = async (uuid) => {
  let scoreUser = await UserModel.findOne({ uuid }).lean();
  return await ScoreModel.find({ _id: scoreUser.score }).lean();
};

exports.getTopPlayers = async (uuid) => {
  let ranking = {
    normal: [],
    speed: [],
    hard: [],
  };

  let scores = await ScoreModel.aggregate([
    { $addFields: { intNumbers: { $toInt: "$points" } } },
    { $sort: { intNumbers: -1 } },
    { $project: { _id: 1, points: 1, mode: 1 } },
  ]);

  await Promise.allSettled(
    scores.map(async (e, i) => {
      if (ranking[e.mode].length < 3) {
        ranking[e.mode].push({
          ...e,
          user: Object(await UserModel.findOne({ score: e._id }).lean())
            .username,
          position: ranking[e.mode].length
        });
      }
    })
  );

  return ranking
  return Object.keys(ranking).map((k) => ranking[k].sort((a, b) => a.position > b.position))[0]
};

exports.updateScore = async (newScore) => {
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

exports.setScore = async (scoreInfo) => {
  let obj = {
    points: scoreInfo.score,
    mode: scoreInfo.mode
  }

  let userScores = await UserModel.findOne({ uuid: scoreInfo.uuid }, 'score').lean()
  let exists;

  await Promise.allSettled(
    await userScores.score.map(async (e) => exists = (await ScoreModel.findOne({ _id: e }).lean()).mode == obj.mode),
  )

  if (exists) {
    if (parseInt((await ScoreModel.findOne({ mode: obj.mode, _id: userScores.score }).lean()).points) < parseInt(obj.points)) {
      await Promise.allSettled(
        userScores.score.map(async (e) => await ScoreModel.updateOne({ _id: e, mode: obj.mode }, { $set: { points: obj.points } }))
      )
      return { message: 'updated' }
    }

    return { message: 'exists' }
  } else {
    let doc = await ScoreModel.create(obj)

    return await UserModel.updateOne({ uuid: scoreInfo.uuid }, {
      $push: { score: doc._id }
    })
  }


}