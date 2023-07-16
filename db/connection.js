
const mongoose =require('mongoose')

const connectionstring=process.env.DATABASE

mongoose.connect(connectionstring,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{
    console.log('Mongodb atlas connected successfully');
}).catch((error)=>{
    console.log("Mongodb connection error"+error);
})

