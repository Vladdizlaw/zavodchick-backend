import MessageService from "./messageservice.js";

class MessageController {
  async postMessage(req, res) {
    try {
      // console.log('post_chat',[arguments])
      const data = await MessageService.postMessage(
        req.body.from,
        req.body.to,
        req.body.name,
        req.body.msg
      );
      return res.status("200").json(data);
    } catch (e) {
      console.log(e);
      return res.status(500).json(e);
    }
  }
}
export default new MessageController();
