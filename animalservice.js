import Animal from "./animal.js";
import path from "path";
import * as uuid from "uuid";
class AnimalService {

    async createPhoto(files, id) {
        console.log('arguments createphoto',[arguments])
        try {
         const photoUrl = [];
          Object.keys(files).forEach((el) => {
            const nameFile = uuid.v4() + files[el].name;
            const filePath = path.resolve("static", nameFile);
            files[el].mv(filePath);
           
            photoUrl.push(nameFile);
          });
        //   const targetFielad=`animals[${index}].photoUrl`
          // const a = await User.findOneAndUpdate(
          //   { "profile.id": id },
          //   // {'animals':{[index]: {'photoUrl':photoUrl}}}
          //   {[targetFielad]:photoUrl},
          //   { returnOriginal: false }
          // );
        try{
          const animal = await Animal.findOneAndUpdate({"id": id },
          {'photoUrl':photoUrl})
        
             console.log("phhoto-answer",animal)
        }catch (e) {
            console.log("phhoto-answer",e)
        }
          
         
          
        } catch (e) {
          console.log(e);
        }
      
      }
async createAnimal(animal){
    
    const createdAnimal= await Animal.create(animal)
    return createdAnimal
    
}
async getAnimals(owner){
     const animals = Animal.find({'owner':owner})
     console.log('animals :',animals)
     return animals
}

}
export default new AnimalService()