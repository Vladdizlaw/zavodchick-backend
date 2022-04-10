import Router  from "express";
import verifyToken from './middleware.js'
import SupportController from './supportcontroller.js'
import AnimalController from './animalcontroller.js'
import MessageController from './messages.js'
import ChatController from "./chatcontroller.js";
const router= new Router()
import UserController from "./usercontroller.js"
router.post("/create_animal",AnimalController.createAnimal)
router.get("/get_animals:ownerId",AnimalController.getAnimals) 
router.post("/create_photo", AnimalController.createPhoto)
router.post("/create_user", UserController.createUser)
router.get("/get_auth_user",verifyToken, UserController.getAuthUser) 
router.post("/get_users",UserController.getUsers) 
router.get("/get_user:id",UserController.getUser)
router.get("/get_custom_users/:animalType/:startAge/:stopAge/:male/:breed/:awards/:place/:dateMating/:id",UserController.getCustomUsers)    
router.put("/update_user",UserController.updateUser)
router.delete("/delete_user:id",UserController.deleteUser)
router.post("/login",UserController.login)
router.post("/subscribe",SupportController.subscribePush)
router.get("/logout",verifyToken, UserController.logout)
router.get("/get_city/:long/:lat",SupportController.getCity)
router.post("/message",MessageController.postMessage)
router.get("/chat/create_chat/:commonId/:secondId",ChatController.createChat)
router.post("/chat/get_chat/",ChatController.getChat)
router.post("/chat/get_chats",ChatController.getChats)
router.post("/chat/post_message",ChatController.postMessage)
router.post("/chat/delete_chat/",ChatController.deleteChat)
export default router