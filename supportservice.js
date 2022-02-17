import axios from "axios";
import translate from "translate";
import webPush from "web-push"
class SupportService {
  async getCity(long, lat) {
    //Получаем город из геопозиции
    try {
      const data = await axios.get(
        "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
          lat +
          "," +
          long +
          `&key=${process.env.GOOGLE_KEY}`
      );
      // console.log("city",data.data.results);
      let result = data.data.results[0]["address_components"][2]["long_name"];

      const city =
        result.split(" ")[0] == "Gorod" ? result.split(" ")[1] : result;

      translate.engine = "google"; //переводим город  с латиницы на русский

      translate.key = process.env.GOOGLE_KEY;
      const res = await translate(city, "ru");
      console.log("city:", res);
      return res;
    } catch (e) {
      throw new Error(e);
    }
  }
  async subscribePush(subscription){
    webPush.setVapidDetails(
      "mailto:test@test.com",
  process.env.publicVapidKey,
  process.env.privateVapidKey
    )
    console.log('subs',subscription)
    const payload = JSON.stringify({ title: "Zavodchick notification" });

  // Pass object into sendNotification
  webPush
    .sendNotification(subscription, payload)
    .catch(err => console.error(err));

  }
}
export default new SupportService();
