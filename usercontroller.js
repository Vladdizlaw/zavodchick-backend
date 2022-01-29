import UserService from "./userservice.js";
class UserController {
  async createUser(req, res) {
    try {
      // console.log('req:',req.body)
      const user = await UserService.createUser(req.body);

      res
        .cookie("access_token", user.token, { httpOnly: true })
        .status(200)
        .json(user);
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  }
  async login(req, res) {
    try {
      const user = await UserService.login(req.body);
      res
        .cookie("access_token", user.token, { httpOnly: true })
        .status(200)
        .json(user);
      // res.setHeader('Set-Cookie', `access_token=${user.token}; HttpOnly`).status(200).json(user);
    } catch (e) {
      console.log(e);
      res.status(404).json(e);
    }
  }
  async logout(req, res) {
    try {
      return res
        .clearCookie("access_token")
        .status(200)
        .json({ message: "Successfully logged out " });
    } catch (e) {
      console.log(e);
      res.status(501).json(e);
    }
  }
  async createPhoto(req, res) {
    try {
      //  console.log(req.body.id)
      const user = UserService.createPhoto(req.files, req.body.id);
      // console.log(req.body)

      res.status(200).json(req.body);
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  }
  async getUsers(req, res) {
    try {
      const users = await UserService.getUsers();
      res.json(users);
    } catch (e) {
      res.status(500).json(e);
    }
  }
  async getAuthUser(req, res) {
    try {
      // console.log("getauthuser req:", req.userId);
      const user = await UserService.getUser(req.userId);

      return res.json(user);
    } catch (e) {
      res.status(500).json(e);
      console.log(e);
    }
  }
  async getUser(req, res) {
    try {
      console.log(req.params.id);
      const user = await UserService.getUser(req.params.id);

      return res.json(user);
    } catch (e) {
      res.status(500).json(e);
      console.log(e);
    }
  }
  async updateUser(req, res) {
    try {
      const updatedUser = await UserService.updateUser(req.body);

      return res.json(updatedUser);
    } catch (e) {
      res.status(500).json(e);
    }
  }
  async deleteUser(req, res) {
    try {
      const deletedUser = await User.findOneAndDelete(req.params.id);
      res.json(deletedUser);
    } catch (e) {
      res.status(500).json(e);
    }
  }
  async getCustomUsers(req, res) {
    try{
      const {animalType,startAge,stopAge,male,breed,awards,place,dateMating,id} = req.params
      const users= await UserService.getCustomUsers(animalType,startAge,stopAge,male,breed,awards,place,dateMating,id)
      // console.log('searcparams',animalType,age,male,breed,awards,place,dateMating,id)
      res.status(200).json(users)
    } catch(e){
      res.status(500).json(e)
    }
  }
}
export default new UserController();
