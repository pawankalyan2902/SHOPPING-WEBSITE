const product_details = require("../Models/Product_details");
const model_orders = require("../Models/Order_details");
const model_auth_details = require("../Models/Signup_details");
//Add manage_products
function manage_products(req, res) {
    res.render("manage_products");
}

//post add products
async function manage_products_forms(req, res) {
    const data = req.body;
    const file = req.file;
    const product_data = new product_details(data.title, file.path, data.summary, data.price, data.description);
    await product_data.create();
    // const details=await product_data.find();
    res.redirect("/");
}

//get manged_orders
async function manage_orders(req, res) {
    const order_details = await model_orders.fetchAll();
    let data = [];
    const email=req.session.personal_id
    for (let ods of order_details)//order detail single
    {
        const pord = new product_details("", "", "", "", "", ods.id);
        const prod_details = await pord.find();
        prod_details.orders = ods;
        const auth_data=new model_auth_details(ods.personal_id);
        const personal_details=await auth_data.find();
        prod_details.personal_info=personal_details;
        data.push(prod_details);
    }
    res.render("manage_orders",{prod_data:data});
}

//edit
async function edit(req, res) {
    let id = req.params.id;
    const prod_details = new product_details("", "", "", "", "", id);
    const details = await prod_details.find();
    res.render("update", { details: details });
}

async function post_update(req, res) {
    let id = req.params.id;
    const data = req.body;
    const file = req.file;
    const product_update = new product_details(data.title, file.path, data.summary, data.price, data.description, id);
    await product_update.update();
    res.redirect("/");
}

//order_state
async function order_state(req, res) {
    const id=req.params.id;
    const data=req.body;
    const orders=new model_orders(data.order_status,"","",id);
    const status=await orders.update();
    res.redirect("/admin/manage_orders");
}


//delete
async function deletee(req, res) {
    let id = req.params.id;
    const prod_delete = new product_details("", "", "", "", "", id);
    const order=new model_orders("","","",id);
    await order.delete();
    await prod_delete.delete();
    res.redirect("/");
}

module.exports = {
    manage_products: manage_products,
    manage_products_forms: manage_products_forms,
    manage_orders: manage_orders,
    edit: edit,
    deletee: deletee,
    post_update: post_update,
    order_state:order_state
}