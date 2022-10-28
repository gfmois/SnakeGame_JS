const argon2 = require("argon2");
const { UserModel } = require("../../model");

exports.login = async (userInfo) => {
  try {
    if ((await UserModel.countDocuments({ username: userInfo.username })) > 0) {
      let user = await UserModel.findOne({ username: userInfo.username });
      if (await argon2.verify(user.password, userInfo.password)) {
        return {
          uuid: user.uuid,
          username: user.username,
          avatar: user.avatar,
          score: user.score
        };
      } else { return { message: "Usuario o contraseña no válida" } }
    } else { return { message: "Usuario no existe" } }
  } catch (e) {
    return e;
  }
};

exports.register = async (userInfo) => {
  try {
    if (
      (await UserModel.countDocuments({ username: userInfo.username })) == 0
    ) {
      if (UserModel.create(userInfo)) {
        return {
          message: "Usuario Creado Correctamente",
        };
      }
    } else {
      return {
        message: "Usuario ya existe",
      };
    }
  } catch (e) {
    return e;
  }
};

// Populate
exports.getProfile = async (_id) => {
  try {
    return UserModel.find({ _id }).populate("score");
  } catch (e) {
    return e;
  }
};

exports.updateProfile = async (_id, newUserInfo) => {
  try {
    return UserModel.updateOne({ _id }, newUserInfo);
  } catch (e) {
    return e;
  }
};
