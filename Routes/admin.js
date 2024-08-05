const express=require("express");
const router=express.Router();


//multer to parse files
const multer=require("multer");
const fileConfig=require("../util/multer");
//vv important this the one which is going to parse the file
const upload=multer({storage:fileConfig});

//Requiring Admin Controller
 const controller=require("../Controllers/admin");

//require protection to routes
const protection=require("../Middleware/protection");

// protection to protect all admin page
router.use(protection.admin);


//Add a product
router.get("/manage_products",controller.manage_products);

//post Add a product
router.post("/manage_product_forms",upload.single("images"),controller.manage_products_forms);

//routes to manage orders
router.get("/manage_orders",controller.manage_orders);

//delete
router.get("/delete/:id",controller.deletee);

//edit
router.get("/edit/:id",controller.edit);

//post_update
router.post("/post_update/:id",upload.single("images"),controller.post_update);

//orders
router.post("/order_status/:id",controller.order_state)

module.exports=router;