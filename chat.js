import mongoose from "mongoose";
const Chat = new mongoose.Schema({
  type: "object",
  chatId: { type: String },
  messages: [{ author: { type: String }, value: { type: String },date: {type:String},unseen:{type:Boolean} }],
});
export default mongoose.model("Chat", Chat)
