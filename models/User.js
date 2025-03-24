import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  password: { type: String, required: true, trim: true },
});

const UserModel = mongoose.model("user", UserSchema);

export default UserModel;
