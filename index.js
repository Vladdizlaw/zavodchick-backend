import express from "express";
import bodyParser from "body-parser";
import morgan from 'morgan'//на будующее
import cookieParser from "cookie-parser"
// import webPush from "web-push"//Пуш уведомления
// import dotenv from 'dotenv'
// import GenerateSchema from "generate-schema";
import Mongoose from "mongoose"; //Подключение к mongoDB
import cors from "cors"; //Для работы корс без блокировки
import fileUpload from "express-fileupload"; //Работа с файлами
// import User from "./user.js"
// import multer from 'multer'
// import GridFsStorage from'multer-gridfs-storage'
// import Grid from 'gridfs-stream'
// import methodOverride from 'method-override'
// import fs from 'fs'
// import crypto from 'crypto'
import dotenv from 'dotenv' 
dotenv.config()
import router from "./router.js"; //маршруты
const PORT = process.env.PORT 
const URL_EP=process.env.URLEP
// console.log(PORT,URL_EP)
  
const app = express();
app.use(morgan('combined'))
app.use(cookieParser())
const corsConfig = {
  origin: true,
  credentials: true,
};
app.use(cors(corsConfig)); //Используем cors
app.use(express.json()); //Для парсинга боди пост запросов
app.use(express.static('static'))//Для обработки статики
app.use(bodyParser.json({limit: '50mb',extended: true,
parameterLimit:50000}));
// app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true,
  parameterLimit:50000
}));
app.use(fileUpload({ createParentPath: true}));
app.use(morgan('dev'));
app.use("/api", router);

async function startApp() {
  try {
    await Mongoose.connect(URL_EP, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }); //Подключаемся к MongoDB
    
    app.listen(PORT,  () => {
      console.log("SERVER START AT PORT:", PORT);
    });
  } catch (e) {
    console.log(e);
  }
}

startApp();
