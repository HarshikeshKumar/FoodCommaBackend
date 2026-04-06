import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name shoud be provided"],
      lowercase: true,
      trim: true,
      minlength: [5, "First name should be atleast 5 character long"],
      maxlength: [
        20,
        "First name should be 20 oe less than 20 characters long",
      ],
    },

    lastName: {
      type: String,
      required: [true, "Last name should be provided"],
      lowercase: true,
      trim: true,
      minlength: [5, "Last name should be atleast 5 characters long"],
      maxlength: [20, "Last name should be 20 or less than 20 characters long"],
    },

    mobileNumber: {
      type: String,
      trim: true,
      unique: [true, "This Mobole Number is already in use"],
      required: [true, "Mobile Number should be provided"],
      minlength: [10, "Mobile Number should be atleast 10 characters long"],
      maxlength: [10, "Mobile Number should be maximum of 10 characters long"],
    },

    email: {
      type: String,
      trim: true,
      required: [true, "Email should be provided"],
      unique: [true, "Email is already in use"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },

    password: {
      type: String,
      required: [true, "Password should be provided"],
      minlength: [6, "Password should be atleast 6 characters long"],
    },
  },
  {
    timestamps: true,
  },
);

// Bcrypt Implementation...................
userSchema.pre("save", async function () {
  // console.log("Executing Pre Save Hook.....");
  // console.log(this); // Purana Password milega
  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;
  // console.log(this); // Password Encrypt ho gaya
  // console.log("Exitting Pre Save hook....");
});

const User = mongoose.model("User", userSchema);

export default User;
