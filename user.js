import mongoose from "mongoose";
const User = new mongoose.Schema({
  type: "object",
  mail: { type: String },
  tel: { type: String },
  name: { type: String },
  pass: { type: String },
  city: { type: String },
  id: { type: String },
  hood: { type: String },
  seenFlags: {
    seenHoodFlag: { type: Boolean },
    seenTelFlag: { type: Boolean },
  },
  licenseAgreement: { type: Boolean },
  startTrial: {
    value: { type: Boolean },
    date: { type: Date },
    dateStart: { type: Date },
    dateEnd: { type: Date },
  },
  location: { type: "object", properties: [Object] },
  noticeBreed: {type :"object",properties:[Object]},
  noticeMessages: {type: "object",properties:[Object]},
  chats:{ type: "array", items: [String] },
  token: { type: "string" },
  animals: ["string"]
});



export default mongoose.model("User", User);
