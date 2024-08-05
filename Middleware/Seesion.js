//sessions
const session=require("express-session");
const Mongoconnect=require("connect-mongodb-session");

//It tells where the generated session to be stored
const connect=Mongoconnect(session);
const sessionStore=new connect({
    uri:"mongodb://127.0.0.1:27017/myapp",
    databaseName:"shop",
    collection:"sessions"
})

//Session is generated
const sessions=session(
    {
        secret:"superSecret",
        resave:false,
        saveUninitialized:false,
        store:sessionStore
    }
);

module.exports={
    sessions:sessions
}
