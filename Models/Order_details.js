const dbs=require("../Database/mongodb");
const mongodb=require("mongodb");
const ObjectId= mongodb.ObjectId;

class Order
{ constructor(state,value,personal_id,id)
    {
        
        this.state=state,
        this.value=value,
        this.personal_id=personal_id
        this.id= id
    }

    async insert()
    {
       const data=await dbs.getdb().collection("order_details").insertOne({
        state:this.state,
        value:this.value,
        date:(new Date()).toDateString(),
        personal_id:this.personal_id,
        id:this.id
    });
    };

   static async fetchAll()
    {
       let data= await dbs.getdb().collection("order_details").find({}).toArray();
       return data;
    }

    async find()
    {
        if(!this.id)
        {
            return;
        }
       const data=await dbs.getdb().collection("order_details").findOne({id:this.id})
        return data;
    }
    
    async update()
    {
        try
        {
            const status=await dbs.getdb().collection("order_details").updateOne({_id:new ObjectId(this.id)},{$set:{state:this.state}});
            return status;
        }
        catch(error)
        {
            console.log(error)
        }
      
    }
    async delete()
    {
        try{
            return await dbs.getdb().collection("order_details").deleteOne({id:new ObjectId(this.id)});
        }
        catch(error){
            console.log(error);
        }
   
    }
}

module.exports=Order;