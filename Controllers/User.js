const product_data = require("../Models/Product_details");

//home page
async function home(req, res) {
    const product_details = await product_data.fetchAll();
    res.render("shop", { product_details: product_details });
};

//view details
async function view_details(req, res) {
    req.session.nos = 0;
    res.locals.nos = 0;
    const id = (req.params.id).trim();
    const prod = new product_data("", "", "", "", "", id);
    const data = await prod.find();
    res.render("view_details", { data: data });
}

//from view details to cart page
async function cartid(req, res) {
    const id = (req.params.id).trim();
    const prod = new product_data("", "", "", "", "", id);
    const data = await prod.find();
    req.session.data = data;
    const total_price = (data.price * req.session.nos);
    res.render("cart", { data: data, total_price: total_price });
}

//normal nav
function cart(req, res) {
    let data = req.session.data;
    let total_price;
    if (data) {
        total_price = (data.price * req.session.nos);
    }
    res.render("cart", { data: data, total_price: total_price });
}

// form
function cart_update(req, res) {
    const id = req.params.id
    const data = req.body;
    req.session.nos = data.items;
    res.redirect("/cart/" + id)
}

//ajax
function cart_details(req, res) {
    req.session.nos = req.session.nos + 1;
    res.json({ no_prod: req.session.nos });
}


function failure(req,res)
{
    res.render("failure");
}



module.exports = {
    home: home,
    view_details: view_details,
    cartid: cartid,
    cart_details: cart_details,
    cart: cart,
    cart_update: cart_update,
    failure:failure
}
// extra code
//

// const product_data = require("../Models/Product_details");
// const cart_models=require("../Models/cart_details");
// //home page
// async function home(req, res) {
//     const product_details = await product_data.fetchAll();
//     res.render("shop", { product_details: product_details });
// };

// //view details
// async function view_details(req, res) {
//     req.session.nos = 0;
//     res.locals.nos = 0;
//     const id = (req.params.id).trim();
//     const prod = new product_data("", "", "", "", "", id);
//     const data = await prod.find();
//     res.render("view_details", { data: data });
// }

// //from view details to cart page
// async function cartid(req,res) {
//     const id = (req.params.id).trim();
//     const prod = new product_data("", "", "", "", "", id);
//     const data = await prod.find();
//     const total_price = (data.price * req.session.nos);
//     if(req.session.personal_id){
//     const cart_detail=new cart_models(data,total_price,req.session.nos,);
//     await cart_detail.insert();
// }else
// {
//     req.session.data=data;
//     req.session.total_price=total_price
// }
//     res.redirect("/cart");
// }

// //normal nav
// async function cart(req, res) {  
//     let data,total_value;
//     if(req.session.personal_id){        
//      data = await cart_models.fetchAll();
//      total_value=0;
//     for(const content of data)
//     {
//         total_value=total_value+content.total_price;
//     }
// }else{
//     let [dataa]=req.session.data;
//      total_value=req.session.total_price;
//         const cont=dataa.push(dataa);
//         data=cont;
// }
//     res.render("cart", { content:data,total_value:total_value});
// }

// // form
// function cart_update(req, res) {
//     const id = req.params.id
//     const data = req.body;
//     req.session.nos = data.items;
//     res.redirect("/cart/" + id)
// }

// //ajax
// function cart_details(req, res) {
//     req.session.nos = req.session.nos + 1;
//     res.json({ no_prod: req.session.nos });
// }



// <%-include("includes/head",{title:"Cart"}) %>
//     <link rel="stylesheet" href="/styles/cart.css">

//     <body>
//         <%-include("includes/header") %>
//             <main>
//                 <%if(!content){%>
//                     <h1 id="cart_header">Cart is empty</h1>
//                     <%} else { %>
//                         <h1 id="cart_header">Your Cart</h1>
//                         <% for(const data of content) {%>
//                 <ul id="cart_data">
//                     <li>
//                         <form action="/cart_update/<%=data._id%>" method="post">
//                             <div id="form_cart">
//                                     <!-- <input type="hidden" name="_csrf" value="<%=locals.token%>"> -->
//                                 <label for="items"><%=data.data.title%></label>
//                                 <div>
//                                     <input type="number" id="items" name="items" value=<%=locals.nos%>>
//                                     <button type="submit">Update</button>
//                                 </div>
//                             </div>
//                         </form>
//                     </li>
//                     <li>
//                         <p><%=data.data.price%>$ (<%=data.data.price%>*<%=locals.nos%>)</p>
//                     </li>
//                 </ul>
//                 <%}%>
                
//                 <div id="cart_footer">
//                     <h2>Total:<%=total_value%>$</h2>
//                     <% if(locals.isuser) {%>
//                         <a href="/order/<%=data._id%>">Buy products</a></li>
//                         <% }else{%>
//                     <a href="/login">Log in to purchase products</a>
//                 <%}%>
//                 </div>
//                 <% } %>
//             </main>
//     </body>