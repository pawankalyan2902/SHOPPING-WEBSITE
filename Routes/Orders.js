const express=require("express");
const router=express.Router();

//requiringt orders from controllers
const controller_order=require("../Controllers/orders");

//requiring the user portection
const protection=require("../Middleware/protection");

//protection
router.use(protection.user);

//order page
router.get("/",controller_order.orders)

//order page
router.get("/:id",controller_order.buynow);



module.exports=router