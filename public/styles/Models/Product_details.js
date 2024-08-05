//conncetion tho the database server
const dbs = require("../Database/mongodb");

//to get object id
const mongodb=require("mongodb");
// const mongoose = require('mongoose');
const ObjectId= mongodb.ObjectId;

class Product_details {
    constructor(title, image_path, summary, price, description,id) {
            this.title = title,
            this.image_path = image_path,
            this.summary = summary,
            this.price = price,
            this.description = description,
            this.id=id
    }
    async create() {
        await dbs.getdb().collection("product_details").insertOne({
            title: this.title,
            image_path: this.image_path,
            summary: this.summary,
            price: this.price,
            description: this.description 
        });
        const data=await dbs.getdb().collection("product_details").findOne({title:this.title});
        this.id=data._id;
        return;
    }
    static async fetchAll()
    {
        return await dbs.getdb().collection("product_details").find({}).toArray();
    }

    async find()
    {
        if(!this.id)
        {
            return;
        };
        let data;
        try{
            // const testId =new mongoose.Types.ObjectId(this.id);
          data=await dbs.getdb().collection("product_details").findOne({_id:new ObjectId(this.id)})
        }
        catch(error)
        {
            console.log(error);
        }
     
        return data;
    }

    async update()
    {
        await dbs.getdb().collection("product_details").updateOne({_id:new ObjectId(this.id)},{$set:{
            title: this.title,
            image_path: this.image_path,
            summary: this.summary,
            price: this.price,
            description: this.description 
        }});
    }
    async delete()
    {
        if(!this.id)
        {
            return;
        }
        await dbs.getdb().collection("product_details").deleteOne({_id:new ObjectId(this.id)});
    }
}
module.exports=Product_details;
