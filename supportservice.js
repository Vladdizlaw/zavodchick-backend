import axios from "axios";
import translate from "translate";
import webPush from "web-push"
class SupportService {
  async getBreeds(animalType){

  }
  async getPic(animalType){
    
  }
  async getCity(long, lat) {
    //Получаем город из геопозиции
    try {
      const data = await axios.get(
        "https://api.tomtom.com/search/2/reverseGeocode/" +
          lat +
          "," +
          long +
          `json?key=${process.env.TOMTOM_KEY}`
      );
      // console.log("city",data.data.addresses.localName);
      // let result = data.data.results[0]["address_components"][2]["long_name"];

      // const city =
        // result.split(" ")[0] == "Gorod" ? result.split(" ")[1] : result;

      // translate.engine = "google"; //переводим город  с латиницы на русский

      // translate.key = process.env.GOOGLE_KEY;
      // const res = await translate(city, "ru");
      const res=data.data.addresses[0].address.localName
      console.log("city:",res);
      return res;
    } catch (e) {
      throw new Error(e);
    }
  }
  async subscribePush(subscription,msg){
    webPush.setVapidDetails(
      "mailto:zavodhick@zavodchick.com",
  process.env.publicVapidKey,
  process.env.privateVapidKey
    )
    console.log('subs',subscription)
    const payload = JSON.stringify({ title: `Новое сообщение` ,body:msg});

  // Pass object into sendNotification
  webPush
    .sendNotification(subscription, payload)
    .catch(err => console.error(err));

  }
}
export default new SupportService();
