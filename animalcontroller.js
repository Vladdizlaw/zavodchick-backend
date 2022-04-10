import AnimalService from "./animalservice.js";
class AnimalController {
    async createAnimal(req,res){
        try{

            const animal = await AnimalService.createAnimal(req.body)
            res.status(200).json(animal)
        }catch(e){
            res.status(500).json(e)
        }
    }
    async getAnimals(req,res){
        try {
            const animals = await AnimalService.getAnimals(req.params.ownerId);
            res.json(animals);
          } catch (e) {
            res.status(500).json(e);
          }
        }

    
    async createPhoto(req,res){
        try{
            await AnimalService.createPhoto(req.files, req.body.animalId);
            res.status(200)      
        }catch(e){
            console.log(e);
             res.status(500).json(e);
        }


    }
}
export default new AnimalController()