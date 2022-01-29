import Router  from "express";
import verifyToken from './middleware.js'
import SupportController from './supportcontroller.js'
const router= new Router()
// router.use(verifyToken)
// import authController from './AuthController.js'
import UserController from "./usercontroller.js"
router.post("/create_user", UserController.createUser)
router.post("/create_photo", UserController.createPhoto)
router.get("/get_auth_user",verifyToken, UserController.getAuthUser) 
router.get("/get_users",UserController.getUsers) 
router.get("/get_user:id",UserController.getUser)
router.get("/get_custom_users/:animalType/:startAge/:stopAge/:male/:breed/:awards/:place/:dateMating/:id",UserController.getCustomUsers)    
router.put("/update_user",UserController.updateUser)
router.delete("/delete_user:id",UserController.deleteUser)
router.post("/login",UserController.login)
router.get("/logout",verifyToken, UserController.logout)
router.get("/get_city/:long/:lat",SupportController.getCity)

export default router