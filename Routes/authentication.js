const express=require("express");
const router=express.Router();

//Requiring auth controllers
const auth=require("../Controllers/Authentication");

//Signup route handler
router.get("/signup",auth.signup);

//Signup post route
router.post("/sign_up_form",auth.sign_up_post);

//login route handler
router.get("/login",auth.login);

//login post
router.post("/login_form",auth.login_post);

//logout
router.get("/logout",auth.logout);

module.exports=router;