import Pusher from "pusher";
import dotenv from 'dotenv' 
dotenv.config()
const pusher =new Pusher({
  appId:process.env.appIdPusher,
  key: process.env.keyPusher,
  secret: process.env.secretPusher,
  cluster: process.env.clusterPusher,
  useTLS: true
});
class MessageService{
    async postMessage(from,to,name,msg){
        console.log([arguments])
    const data=await pusher.trigger(`${to}`,"message",{message:msg,from:from,name:name})
    return data
}
  
}
export default new MessageService();