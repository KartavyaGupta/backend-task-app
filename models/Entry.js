import mongoose from "mongoose";
const EntrySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
const EntryModel = mongoose.model("entry", EntrySchema);
export default EntryModel;
