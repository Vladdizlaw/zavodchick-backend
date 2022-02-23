import Chat from "./chat.js";
class ChatService {
  async createChat(commonUserId, secondUserId) {
    // console.log(
    //   "create params commonuser",
    //   commonUserId,
    //   "seconduser",
    //   secondUserId
    // );
    const chatIdReverse = `${secondUserId}#${commonUserId}`;
    const chatIdNormal = `${commonUserId}#${secondUserId}`;
    const result = await Chat.findOne({ chatId: chatIdReverse });
    const result2= await Chat.findOne({ chatId: chatIdNormal });
    if (result2) {
      console.log("rrsult", result2);
      return result2;
    }else if(result){
        return result;
    } else {
      const chat = await Chat.create({ chatId: chatIdNormal, messages: [] });
      console.log("rrsult", chat);
      return chat;
    }
  }
  async getChats(chatIdArray) {
    const result = [];
    chatIdArray.forEach(async (chatId) => {
      const chat = await Chat.findOne({ chatId: chatId });
      console.log("get_chats", chat);
      result.push(chat);
      console.log("result", result);
    });
    console.log("get_chats done");
    return result;
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
