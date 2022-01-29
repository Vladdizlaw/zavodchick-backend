const div= `<div>
                <div>
                    <div>
                    </div>
                        <div></div> 
                </div>
                </div>`
 const checkEntire=new Promise((res)=>{
     console.log('foo')
     setTimeout(()=>{
         res()
     },0)
 })
console.log('bar')
checkEntire.then(()=>{
    console.log('baz')
})