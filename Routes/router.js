
// import express
const express=require('express')

// create router for express
const router =new express.Router()

// import controller
const userController =require('../controller/userController')
// import multer upload config
const upload =require('../multerConfig/storageConfig')

router.post('/employee/register',upload.single('user_profile'),userController.register)
// define route for get all users
router.get('/employee/get-all-employee-details',userController.getusers)

// define route for view profile
router.get('/employee/view-profile/:id',userController.viewprofile)

// route for delete
router.delete("/employee/delete-user/:id",userController.deleteUser)

// update
router.put("/employee/update/:id",upload.single('user_profile'),userController.editUser)






// export router
module.exports =router