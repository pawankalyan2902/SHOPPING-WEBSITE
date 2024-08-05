//requiring mongodb database
const mongodb=require("mongodb");
//in oreder to connect with the database server (MongoClient is used)
const MongoClient=mongodb.MongoClient

let database;
async function ConnectDatbase()
{
    const Database_server=await MongoClient.connect("mongodb://127.0.0.1:27017/myapp");
     database=Database_server.db("shopping");
}

function getdb()
{
    return database;
}

module.exports={
    ConnectDatbase:ConnectDatbase,
    getdb:getdb
}