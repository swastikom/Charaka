import mongoose, { Schema, models } from "mongoose";


const itemSchema = new Schema({
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
      default: "1234",
    },
  },
  { timestamps: true, versionKey: false }
);

const User = models.User || mongoose.model("User", userSchema);
export default User;
