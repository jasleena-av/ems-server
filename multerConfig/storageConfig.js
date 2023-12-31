// multer is used for store multipart/form-data in backend.it is middleware
// import
const multer=require('multer')


// using multer define storage
const storage=multer.diskStorage({
    destination:(req,File,callback)=>{
        callback(null,"./uploads")
    },
    filename:(req,file,callback)=>{
        const filename=`image-${Date.now()}-${file.originalname}`
        callback(null,filename)
    }
})

// filtering uploading files
const fileFilter =(req,file,callback)=>{
    if(file.mimetype==='image/png' || file.mimetype==='image/jpg' || file.mimetype==='image/jpeg'){
        callback(null,true)
    }else{
        callback(null,false)
        return callback(new Error("Only .png, .jpeg, .jpg files are allowed"))
    }
}

// define upload
const upload =multer({
    storage,
    fileFilter
})
 module.exports =upload
