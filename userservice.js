import User from "./user.js";
import Animal from "./animal.js"
import * as uuid from "uuid";
// import path from "path";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class UserService {
  // //Работа с пользователем
  async getAllMails() {
    const mails = await User.find({}, { mail: 1, _id: 0 });
    return mails;
  }
  async login(data) {
    const { mail, pass } = data;
    if (!mail || !pass) {
      console.log("No email or pass");
      throw new Error("No email or pass");
    }
    const user = await User.findOne({ "mail": mail });
    if (!user) {
      throw new Error("No user with this email");
    }
    if (await bcrypt.compare(pass, user.pass)) {                          
      const token = jwt.sign(
        { user_id: user.id, email: user.mail },
        process.env.TOKEN_KEY
      );

      // save user token
      user.token = token;
      return user;
    }
  }

  async createUser(profile) {
    const oldUser = await User.findOne({ mail: profile.mail });
    if (oldUser) {
      // console.log("oldUser:", oldUser);
      throw new Error("Duplicate email");
    }
    let encryptedPassword = bcrypt.hashSync(profile.pass, 10);
    // console.log("encrypted:", encryptedPassword);
    profile.pass = encryptedPassword;
    const token = jwt.sign(
      { user_id: profile.id, email: profile.mail },
      process.env.TOKEN_KEY
    );
    profile.token = token;
    const createdUser = await User.create(profile);
    // const usersSubscrubed= await User.find({"noticeBreed.push": true})

    // console.log("return:", user);
    return createdUser;
  }

  async getCustomUsers(
    typeAnimal,
    startAge,
    stopAge,
    male,
    breed,
    awards,
    city,
    dateMating,
    id
  ) {
    // console.log(arguments)
    const searchObj = { typeAnimal, male, breed, awards, city, dateMating, id };
    let user = {};
    let animal = {};
    Object.keys(searchObj).forEach((key) => {
      if (searchObj[key] !== "null" && searchObj[key] !== "undefined") {
        console.log(searchObj[key]);
        animal[key] = searchObj[key];

        if (key == "city") {
        //   user[String(`profile.${key}`)] = animal[key];
        null
        } 
         else if (key == "dateMating") {
          const beforeDate = animal[key].split("-");
          const afterDate = animal[key].split("-");
          beforeDate.splice(
            1,
            1,
            Number(animal[key].split("-")[1]) < 10
              ? `0${Number(animal[key].split("-")[1]) + 1}`
              : Number(animal[key].split("-")[1]) + 1
          );
          afterDate.splice(
            1,
            1,
            Number(animal[key].split("-")[1]) < 10
              ? `0${Number(animal[key].split("-")[1]) - 1}`
              : Number(animal[key].split("-")[1]) - 1
          );
          console.log(beforeDate);
          user["dateMating"] = {
            $gt: afterDate.join("-"),
            $lt: beforeDate.join("-"),
          };
        } else if (key == "id") {
          // user[String(`profile.${key}`)] = { $ne: animal[key] };
          null
        } else {
          user[String(`${key}`)] = animal[key];
        }
      }
    });
    if (startAge && startAge !== "null" && (!stopAge || stopAge == "null")) {
      // console.log("startAge:",startAge,"stopAge:",stopAge)
      user["age"] = { $gt: startAge };
    }
    if (startAge && startAge !== "null" && stopAge && stopAge !== "null") {
      user["age"] = { $gt: startAge, $lt: stopAge };
    }
    if ((!startAge || startAge == "null") && stopAge && stopAge !== "null") {
      user["age"] = { $lt: stopAge };
    }

    console.log("getCustomUsers:", user);
    try {
      const animals = await Animal.find(user).exec();
      console.log("getCustomUsers:", animals.length);
      let owners
     
        const ownerIds=[]
        animals.forEach(animal=>{
          ownerIds.push(animal.owner)
          
        })
        if (searchObj.city&&searchObj.city!=='null'){
        owners= await User.find({'id':{$in: ownerIds,$ne: searchObj.id},"city":searchObj.city})
        // console.log('ownerIdzs',owners)
        }else{
          owners= await User.find({'id':{$in: ownerIds,$ne: searchObj.id}})
        // console.log('ownerIdzs',owners)
        }
      return {animals,owners};
    } catch (e) {
      console.log(e);
      return e;
    }
  }
  async getUsers(idArray) {
    const users = await User.find({ "id": { $in: idArray } });
    return users;
  }
  async getUser(id) {
    // console.log("getUser id", id);
    if (!id) {
      throw new Error("No id");
    }
    const user = await User.findOne({ "id": id });
    // console.log("getUser", user);

    return user;
  }
  async updateUser(user) {
    const updatedUser = await User.findOneAndUpdate(
      { "id": user.profile.id },
      user,
      { returnOriginal: false }
    );
    return updatedUser;
  }
  async deleteUser(id) {
    await User.findOneAndDelete({ "id": id });
  }
}
export default new UserService();
