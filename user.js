import mongoose from "mongoose";

const Profile = new mongoose.Schema({
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
});
// mongoose.model("profile", Profile, "profile");
const Animal = new mongoose.Schema({
  type: "object",
  typeAnimal: { type: String },
  male: { type: String },
  age: { type: Number },
  breed: { type: String },
  name: { type: String },
  dateMating: { type: Date },
  awards: { type: String },
  vaccination: { type: String },
  color: { type: String },
  matingConditions: { type: String },
  licenseAgreement: { type: Boolean },
  startTrial: {
    value: { type: Boolean },
    date: { type: Date },
    dateStart: { type: Date },
    dateEnd: { type: Date },
  },
});
// mongoose.model("animal", Animal, "animal");
const User = new mongoose.Schema({
  type: "object",
  animal: { type: "object", ref: "animal" },
  id: { type: "string" },
  location: { type: "object", properties: [Object] },
  photoAnimal: { type: "array", items: [Object] },
  photoUrl: { type: "array", items: [String] },
  profile: { type: "object", ref: "profile" },
  noticeBreed: {type :"object",properties:[Object]},
  noticeMatingDate: {type: "object",properties:[Object]},
  chats:{ type: "array", items: [String] },
  token: { type: "string" },
});
export default mongoose.model("User", User);
