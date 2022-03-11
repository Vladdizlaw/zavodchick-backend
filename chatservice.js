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
    const resultChats = [];
    var chats = await Chat.find({ chatId: {$in:chatIdArray }});
    // chatIdArray.forEach(async (chatId) => {
    //   try {
    //   var chat = await Chat.findOne({ chatId: chatId });
    //   } catch(e){
    //     console.log('e',e)
    //   }
    //   if (!chat) {
    //       console.log('chat not  found')
    //     const chatReverse = chatId.split("#");
    //     chat = await Chat.findOne({
    //       chatId: `${chatReverse[1]}#${chatReverse[0]}`,
    //     });
    //   }
    //   if (chat.messages.length > 100) {
    //     // console.log("result>100");
    //     const seqMessages = chat.messages.slice(-100);
    //     const newChat = { chatId: chat.chatId, messages: seqMessages };
    //     await resultChats.push(JSON.stringify(newChat));
    //   } else {
    //     await resultChats.push(JSON.stringify(chat));
    //   }
      // console.log("get_chats", chat);
    // });
   
    // setTimeout(()=>{
    //   console.log("get_chats_result", resultChats.length);
    //   //  console.log("get_chats done",resultChats[0]);
    //   return  resultChats;
    // },700)
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
    console.log("getChat", chatId, chat);
    return chat;
  }
}
export default new ChatService();
