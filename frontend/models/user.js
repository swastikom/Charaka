import mongoose, { Schema, models } from "mongoose";


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


const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    itemList: [itemSchema],
    otp: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);
export default User;
