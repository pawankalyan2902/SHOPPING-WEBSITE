const express=require("express");
const router=express.Router();


//rquiring controller file
const controller=require("../Controllers/User");

//home page
router.get("/",controller.home)

//view_details of particular product
router.get("/view/:id",controller.view_details);

//cart page
router.get("/cart",controller.cart);

//cart page
router.get("/cart/:id",controller.cartid);

//forms
router.post("/cart_update/:id",controller.cart_update);

//cart details ajax
router.get("/cart_details",controller.cart_details);

// stripe

//failure
router.get("/cancel",controller.failure)


module.exports=router;