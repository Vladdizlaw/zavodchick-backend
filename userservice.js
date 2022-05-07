import User from "./user.js";
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
          user[String(`profile.${key}`)] = animal[key];
        } else if (key == "dateMating") {
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
          user["animal.dateMating"] = {
            $gt: afterDate.join("-"),
            $lt: beforeDate.join("-"),
          };
        } else if (key == "id") {
          user[String(`profile.${key}`)] = { $ne: animal[key] };
        } else {
          user[String(`animal.${key}`)] = animal[key];
        }
      }
    });
    if (startAge && startAge !== "null" && (!stopAge || stopAge == "null")) {
      // console.log("startAge:",startAge,"stopAge:",stopAge)
      user["animal.age"] = { $gt: startAge };
    }
    if (startAge && startAge !== "null" && stopAge && stopAge !== "null") {
      user["animal.age"] = { $gt: startAge, $lt: stopAge };
    }
    if ((!startAge || startAge == "null") && stopAge && stopAge !== "null") {
      user["animal.age"] = { $lt: stopAge };
    }

    console.log("getCustomUsers:", user);
    try {
      const users = await User.find(user).exec();
      console.log("getCustomUsers:", users.length);
      return users;
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
