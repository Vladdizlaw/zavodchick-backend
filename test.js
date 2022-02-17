class Animal{
    constructor(age,length){
    this.age=age
    this.length=length
    }
    voice=()=>{
        console.log(this)
    }
}
function Animal1(age,length){
    this.age=age
    this.length=length
    this.voice=function (){
        console.log(this)
    }
}
const dog= new Animal(1,7)
const cat = new Animal1(1,7)
dog.voice()
cat.voice()
console.log(dog.__proto__,Animal.prototype)