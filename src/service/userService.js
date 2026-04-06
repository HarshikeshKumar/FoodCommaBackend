import { createUserRepo, findUserRepo } from "../repository/userRepository.js";

// It will create a brand new user in db
async function registerUserService(userDetails) {
  console.log("Hitting Service Layer...........");
  // STEP:1. -> We need to check if the user with this email and mobile number already exist or not
  const user = await findUserRepo({
    email: userDetails.email, // on the basis of email and mobileNumber
    mobileNumber: userDetails.mobileNumber,
  });

  // If we found user in db
  if (user) {
    throw {
      reason: "User with the given email and mobile number already exist",
      statusCode: 400,
    };
  }
  // STEP:2. -> If not the create the user in db
  const newUser = await createUserRepo({
    email: userDetails.email,
    password: userDetails.password,
    firstName: userDetails.firstName,
    lastName: userDetails.lastName,
    mobileNumber: userDetails.mobileNumber,
  });

  // Agar kisi wajah se ham user create nhi krr paye
  if (!newUser) {
    throw {
      reason: "Something went wrong, Cannot create user",
      statusCode: 500,
    };
  }

  // STEP:3. ->  Return the created user
  return newUser;
}

export { registerUserService };
