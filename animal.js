import mongoose from "mongoose";
const Animal = new mongoose.Schema({
    type: "object",
    typeAnimal: { type: String },
    male: { type: String },
    age: { type: Number },
    breed: { type: String },
    ind:{type:String},
    name: { type: String },
    dateMating: { type: Date },
    awards: { type: String },
    vaccination: { type: String },
    color: { type: String },
    photoUrl: { type: "array", items: [String] },
    photoAnimal: { type: "array", items: [Object] },
    matingConditions: { type: String },
    owner:{type:String},
    id:{type:String},
   
    
  });

  export default mongoose.model("Animal", Animal);