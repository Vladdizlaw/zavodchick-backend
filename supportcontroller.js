

import SupportService from "./supportservice.js"

class SupportController {
    async getCity(req,res){
        try{
            
        const data= await SupportService.getCity(req.params.long,req.params.lat)
        console.log("city::",data)
        res.status(200).json(data)
        }catch(e){
            console.log(e)
            return res.status(404).json({message:'City not found'})
        }
    }
    async subscribePush(req,res){
        try{ 
            console.log('subscribe', req.body)
            const body= req.body
            const data = await SupportService.subscribePush(body.subs,body.msg)
           
            return res.status(200).json(data)
        }catch(e){
            console.log(e)
            return res.status(500).json({message:'Error in push service'}) 
        }
    }
}
export default new SupportController()