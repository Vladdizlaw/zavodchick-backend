import User from "./user.js";
import * as uuid from "uuid";
import path from "path";
import bcrypt from "bcryptjs";
// import { url } from "inspector";
import jwt from "jsonwebtoken";
import { start } from "repl";
// import cookieParser from "cookie-parser"
// import {URL} from 'url';
// import dotenv from 'dotenv'
// dotenv.config()

class UserService {
  async login(data) {
    const { mail, pass } = data;
    if (!mail || !pass) {
      console.log("No email or pass");
      throw new Error("No email or pass");
    }
    const user = await User.findOne({ "profile.mail": mail });
    if (!user) {
      throw new Error("No user with this email");
    }
    if (await bcrypt.compare(pass, user.profile.pass)) {
      const token = jwt.sign(
        { user_id: user.id, email: user.profile.mail },
        process.env.TOKEN_KEY
      );

      // save user token
      user.token = token;
      return user;
    }
  }

  async createUser(user) {
    // const newUser = { ...user };
    // console.log("newUser:", user);
    const oldUser = await User.findOne({ "profile.mail": user.profile.mail });
    // console.log('oldUser:',oldUser);
    if (oldUser) {
      // console.log("error");
      console.log("oldUser:", oldUser);
      throw new Error("Duplicate email");
    }
    let encryptedPassword = bcrypt.hashSync(user.profile.pass, 10);
    console.log("encrypted:", encryptedPassword);
    user.profile.pass = encryptedPassword;
    const token = jwt.sign(
      { user_id: user.id, email: user.profile.mail },
      process.env.TOKEN_KEY
    );
    user.token = token;
    const createdUser = await User.create(user);
    // console.log("return:", user);
    return createdUser;
  }
  async createPhoto(files, id) {
    try {
      //  const user=User.findOne({"profile.id":id})
      //  console.log(user)
      // let photoArr = [];

      let photoUrl = [];
      Object.keys(files).forEach((el) => {
        // console.log(files[el]);

        const nameFile = uuid.v4() + files[el].name;
        const filePath = path.resolve("static", nameFile);
        files[el].mv(filePath);
        // console.log();
        // const blob=new Blob(files[el])
        // const urlq= new URL(filePath)
        // console.log(urlq)
        // photoArr.push(files[el]);
        photoUrl.push(nameFile);
      });
      const a = await User.findOneAndUpdate(
        { "profile.id": id },
        { photoUrl: photoUrl }
      );
      // user.update({photoUrl:photoArr})
    } catch (e) {
      console.log(e);
    }
    //   photo.forEach(element => {

    //   });
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
          
        } else if(key=='id') {
          user[String(`profile.${key}`)]={$ne:animal[key]}

        }else {
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
  async getUsers() {
    const users = await User.find();
    return users;
  }
  async getUser(id) {
    console.log("getUser id", id);
    if (!id) {
      throw new Error("No id");
    }
    const user = await User.findOne({ "profile.id": id });
    console.log("getUser", user);

    return user;
  }
  async updateUser(user) {
    const updatedUser = await User.findOneAndUpdate(
      { "profile.id": user.profile.id },
      user,
      { returnOriginal: false }
    );
    return updatedUser;
  }
  async deleteUser(id) {
    await User.findOneAndDelete({ "profile.id": id });
  }
}
export default new UserService();
