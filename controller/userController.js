// import model
const users =require('../model/userSchema')

// define logic to resolve client request



// register
  exports.register = async(req,res)=>{

   console.log(req.file);

   const file=req.file.filename
   //  get other user input from req body
   const{fname,lname,email,mobile,gender,status,location} =req.body
   
   if(!fname || !lname || !email || !mobile || !gender || !status || !location || !file){
      res.status(403).json("All inputs are required")
   }

   try{

      // check existing user
   const existinguser = await users.findOne({email})
   if(existinguser){
      res.status(406).json("user already exist")
   }
   else{
      // register user to db
      const newuser =new users({
         fname,lname,email,mobile,gender,status,profile:file,location
      })
      // db save
      await newuser.save()
      res.status(200).json(newuser)
   } }
   catch(error){
      res.status(401).json(error)

   }
   
}


// get user details
exports.getusers =async(req,res)=>{
   // get search query from req
   const search=req.query.search
   const query ={
      fname:{$regex:search,$options:"i"}
   }
   
   try{
     const allusers= await users.find(query)
      res.status(200).json(allusers)


   }
   catch(error){
      res.status(401).json(error)

   }

}

// get viewprofile for user
exports.viewprofile =async (req,res)=>{
   // get params from req
   const{id} =req.params
   try{
      const preuser=await users.findOne({_id:id})
   
      res.status(200).json(preuser)
      

   }
   catch(error){
      res.status(401).json("Employee doesn't exist!!!!")

   }
}

// delete user
exports.deleteUser =async(req,res)=>{
   // get params from req
   const{id} =req.params

   try{
      const deleteprofile=await users.findByIdAndDelete({_id:id})
      res.status(200).json(deleteprofile)

   }
   catch(error){
      res.status(401).json(error)

   }
}

// update user
exports.editUser =async(req,res)=>{
   const{id} =req.params

   const file=req.file?req.file.filename:user_profile
   //  get other user input from req body
   const {fname,lname,email,mobile,gender,status,location,user_profile} =req.body

   try{
      const updateuser=await users.findByIdAndUpdate({_id:id},{
         fname,lname,email,mobile,gender,status,profile:file,location

      },{
         new:true
      })
      // to save in mongodb
      await updateuser.save()
      res.status(200).json(updateuser)


   }
   catch(error){
      res.status(401).json(error)

   }

   

}