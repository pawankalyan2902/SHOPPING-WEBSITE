const Product_details = require("../Models/Product_details");
const model_orders = require("../Models/Order_details");
const user_details = require("../Models/Signup_details");

// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys

//stripe payments (start)
const stripe = require("stripe")("sk_test_51Oc9xuSJAxm6MFKpqsLubDtKMUs8RQ6KXO3M5LVktVoTJg5VIG3qAoVyDqCJvVN9SmyS1oOyqLZIjLP6TDpMuh0Z00x4tLZ8LH");
//stripe ends

async function buynow(req, res) {
    const id = (req.params.id).trim();
    //making all session null 
    res.locals.nos = 0;
    req.session.data = null;
    const pord = new Product_details("", "", "", "", "", id);
    const data = await pord.find();
    const total_price = (data.price * req.session.nos);
    const order_details = new model_orders("pending", total_price, req.session.personal_id, data._id);
    await order_details.insert();
    const nos=req.session.nos;
    req.session.nos = null;
    //stripe api
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
            {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: data.title,
                    },
                    unit_amount: data.price * 100,
                },
                quantity: nos,
            },
        ],
        mode: "payment",
        success_url: "http://localhost:3000/order",
        cancel_url: "http://localhost:3000/cancel",
     } );
    

    res.redirect(303, session.url);
}

async function orders(req, res) {
    //to do from here
    const order_details = await model_orders.fetchAll();
    let data = [];
    for (let ods of order_details)//order detail single
    {
        const pord = new Product_details("", "", "", "", "", ods.id);
        if (ods.personal_id == req.session.personal_id) {
            const prod_details = await pord.find();
            prod_details.orders = ods;
            data.push(prod_details);
        }

    }
    res.render("orders", { product_details: data });
}

module.exports =
{
    buynow: buynow,
    orders: orders
}

