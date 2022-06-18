import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: false,
  },
  phonenumber: {
    type: String,
    require: false,
  },
  googleId: {
    type: String,
    require: false,
  },
  token: {
    type: String,
  }
})

export default mongoose.model("User", userSchema);