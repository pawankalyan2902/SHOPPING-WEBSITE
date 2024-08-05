const multer=require("multer");
//config Multer
const fileConfig=multer.diskStorage({
    destination:function(req,file,cb)
    {
        cb(null,"images");
    },
    filename:function(req,file,cb)
    {
        cb(null,Date.now()+"-"+file.originalname);
    }
})

module.exports=fileConfig;