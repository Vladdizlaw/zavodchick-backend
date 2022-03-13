import Chat from "./chat.js";
import MessageService from "./messageservice.js";
async function get_chat(idChat){

}
class ChatService {
  async createChat(commonUserId, secondUserId) {
    const chatIdReverse = `${secondUserId}#${commonUserId}`;
    const chatIdNormal = `${commonUserId}#${secondUserId}`;
    const result = await Chat.findOne({ chatId: chatIdReverse });
    const result2 = await Chat.findOne({ chatId: chatIdNormal });
    if (result2) {
      console.log("rrsult", result2);
      return result2;
    } else if (result) {
      return result;
    } else {
      const chat = await Chat.create({ chatId: chatIdNormal, messages: [] });
      console.log("result", chat);
      return chat;
    }
  }
  async getChats(chatIdArray) {
    const idsReverseArray = [];
    chatIdArray.forEach((el)=>{
      let idRev=el.split('#')
      idsReverseArray.push(`${idRev[1]}#${idRev[0]}`)
    } )
    const sumArray=[...chatIdArray,...idsReverseArray]
   
    const chats = await Chat.find({ chatId: {$in:sumArray }});
  
    return chats
  }
  async postMessage(chatId, author, msg) {
    const msgToAdd = { author: author, value: msg, date: Date.now() };
    let chat = await Chat.findOne({ chatId: chatId });
    console.log("postmessage", chat.messages);
    const arrToUpdate = chat.messages;
    arrToUpdate.push(msgToAdd);
    const result = await Chat.findOneAndUpdate(
      { chatId: chatId },
      { messages: arrToUpdate }
    );

    return result;
  }
  async getChat(chatId) {
    let chat = await Chat.findOne({ chatId: chatId });
    if (!chat){
      let idRev=chatId.split('#')
     chatId=`${idRev[1]}#${idRev[0]}`
     chat = await Chat.findOne({ chatId: chatId });
    }
    console.log("getChat", chatId, chat);
    return chat;
  }
}
export default new ChatService();
