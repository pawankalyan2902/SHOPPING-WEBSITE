//Requiring the framework express
const express = require("express");
const app = express();

//fs
const path = require("path");

//finding images
app.use("/images", express.static("images"));

//rendering static files
app.use(express.static("public"));

//setting up template engine for rendering views
app.set("view engine", "ejs");
const views = path.join(__dirname, "views");
app.set("views", views);

//connecting database
const dbs = require("./Database/mongodb");

//Middleware to decode the url
app.use(express.urlencoded({ extended: false }));

//requiring sessions
const connect_session = require("./Middleware/Seesion");
app.use(connect_session.sessions);

// //generating csrf token
// const csrf=require("csurf");
// app.use(csrf());

//requiring global variables
const variables = require("./Middleware/global_variables");
app.use(variables);

//Requiring routes
const user_route = require("./Routes/user");
const admin_routes = require("./Routes/admin");
const authentication = require("./Routes/authentication");
const Order = require("./Routes/Orders");
app.use("/", authentication);
app.use("/", user_route);
app.use("/order", Order);
app.use("/admin", admin_routes);


//error handlers
const error_handler = require("./Middleware/error_handlers");
app.use(error_handler.error_page_not_found);
app.use(error_handler.error_internal_error);

dbs.ConnectDatbase().then(
        function () { app.listen(3000) }
)

