const auth_data = require("../Models/Signup_details");
const bcrypt = require("bcrypt");

async function signup(req, res) {
    let signup_data = req.session.signup_session;
    if (!signup_data) {
        signup_data = {
            error: "",
            error_message: "",
            email: "",
            confirm_email: "",
            password: "",
            name: "",
            street: "",
            portal_code: "",
            city: ""
        }

    }
    req.session.signup_session = null;
    res.render("sign_up", { signup_data: signup_data });
};

async function sign_up_post(req, res) {
    const data = req.body;
    const hashed_password = await bcrypt.hash(data.password, 12);

    //instatiating an object to use models
    const signup_obj = new auth_data(
        data.email,
        data.confirm_email,
        hashed_password,
        data.name,
        data.street,
        data.portal_code,
        data.city);

    const signup_data = await signup_obj.find();
    if (signup_data || data.email != data.confirm_email||data.password<8) {

        req.session.signup_session = {
            error: true,
            error_message: "Please check with the signup credentials",
            email: data.email,
            confirm_email: data.confirm_email,
            password: data.password,
            name: data.name,
            street: data.street,
            portal_code: data.portal_code,
            city: data.city
        }
        res.redirect("/signup");
        return;
    }
    await signup_obj.create();
    res.redirect("/login");
}

async function login(req, res) {
    let login_data = req.session.login;
    if (!login_data) {
        login_data = {
            error: "",
            email: "",
            error_message: "",
        }
    }
    req.session.login = null;
    res.render("login", { login_data: login_data });
};


async function login_post(req, res) {

    const data = req.body;
    let signup_obj = new auth_data(data.email);
    let signup_data = await signup_obj.find();
    if (!signup_data) {
        req.session.login = {
            error: true,
            error_message: "User is not Signed Up",
        }
        res.redirect("/login");
        return;
    }
    const compared_password = await bcrypt.compare(data.password, signup_data.password);
    if (!compared_password) {
        req.session.login = {
            error: true,
            email: data.email,
            error_message: "The eneterd password is wrong",
        }
        res.redirect("/login");
        return;
    }
    if (signup_data.isadmin) {
        req.session.isadmin = true;
    }
    else {
        req.session.isuser = true;
    }
    req.session.personal_id=signup_data.email;
   req.session.user_name="User: "+signup_data.personal_details.name;
    res.redirect("/");
};

function logout(req, res) {
    req.session.personal_id=null;
    req.session.user_name=null;
    if (res.locals.isadmin) {
     req.session.isadmin = false;
    }
   else{
      req.session.isuser = false;
    }
    res.redirect("/");
}

module.exports =
{
    signup: signup,
    login: login,
    sign_up_post: sign_up_post,
    login_post: login_post,
    logout: logout
}