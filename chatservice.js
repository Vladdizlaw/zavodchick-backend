import Chat from "./chat.js";


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
  async deleteChat(chatId){
    const chat = await Chat.findOneAndDelete({ chatId: chatId });
    return chat
  }
  async getChats(chatIdArray,selfId) {
    const idsReverseArray = [];
    chatIdArray.forEach((el)=>{
      let idRev=el.split('#')
      idsReverseArray.push(`${idRev[1]}#${idRev[0]}`)
    } )
    const sumArray=[...chatIdArray,...idsReverseArray]
    console.log('sumArray',sumArray)
    
    const chats = await Chat.find({ "chatId" : {$in:sumArray },"chat.messages":{$size:{$gt: 0}}});
    const allChats = await Chat.find({ "chatId": {"$regex":selfId,"$options":"i"},"chat.messages":{$size:{$gt: 0}}});

  
    return {chats, allChats}
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
