import ChatService from "./chatservice.js";
class ChatController {
  async createChat(req, res) {
    try {
      let chatId = await ChatService.createChat(
        req.params.commonId,
        req.params.secondId
      );
      res.status(200).json(chatId);
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  }
  async getChats(req, res) {
    try {
      console.log("chatsbodyreq", req.body);
      let chats = await ChatService.getChats(req.body.chats);
      console.log("chats", chats);
      res.status(200).json(chats);
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  }
  async getChat(req, res) {
    try {
      let chat = await ChatService.getChat(req.body.chatId);
      res.status(200).json(chat);
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  }
  async postMessage(req, res) {
    try {
      // console.log('postmessage',req.body)
      let result = await ChatService.postMessage(
        req.body.chatId,
        req.body.author,
        req.body.msg
      );
      res.status(200).json(result);
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  }
}
export default new ChatController();
