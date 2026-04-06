import User from "../schema/userSchema.js";

async function findUserRepo(parameters) {
  try {
    const response = await User.findOne({ ...parameters });

    return response;
  } catch (error) {
    console.log(error);
  }
}

async function createUserRepo(userDetails) {
  try {
    const response = await User.create(userDetails);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export { findUserRepo, createUserRepo };
