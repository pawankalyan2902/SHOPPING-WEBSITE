//properties od signup collection

//requiring the database connection
const dbs=require("../Database/mongodb"); 

class Signup{
    constructor(email,confirm_email,password,name,street,postalcode,city,id)
    {
        this.email=email,
        this.confirm_email=confirm_email,
        this.password=password,
        this.name=name,
        this.street=street,
        this.postalcode=postalcode,
        this.city=city,
        this.id=id
    }
    async create()
    {
        await dbs.getdb().collection("signup_data").insertOne({
            email:this.email,
            confirm_email:this.confirm_email,
            password:this.password,
            personal_details:
            {
                name:this.name,
                street: this.street,
                postalcode:this.postalcode,
                city:this.city
            }
        });
    }

    async find()
    {
        const signup_data=await dbs.getdb().collection("signup_data").findOne({
            email:this.email
        })
        return signup_data;
    }
}

module.exports=Signup;
