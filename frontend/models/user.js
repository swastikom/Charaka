import mongoose, { Schema, models } from "mongoose";

// const userSchema = new Schema(
//   {
//     email: {
//       type: String,
//       required: true,
//     },
//     name: {
//       type: String,
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// const User = models.User || mongoose.model("User", userSchema);
// export default User;



const itemSchema = new Schema({
  Id: String,
  Fever: String,
  Cough: String,
  Fatigue: String,
  Difficulty_Breathing: String,
  Age: Number,
  Gender: String,
  Blood_Pressure: String,
  Cholesterol_Level: String,
  Disease_freq: String,
  outcome: String,
});

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    itemList: [itemSchema],
    country: String,
    password_reset_otp: String,
  },
  {
    collection: "user", // Specify your desired collection name here
  }
);

const User = models.User || mongoose.model("User", userSchema);

export default User;

