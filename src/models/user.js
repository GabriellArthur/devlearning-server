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
   googleId: {
      type: String,
      require: false,
   },
})

export default mongoose.model("User", userSchema);