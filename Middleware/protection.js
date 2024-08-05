function admin(req,res,next)
{
    if(!req.session.isadmin)
    {
         res.status(401).render("401");
         return;
    }
    next();
}

function user(req,res,next)
{
    if(!req.session.isuser && !req.session.isadmin)
    {
         res.status(401).render("401");
        return;
    }
    next();
}

module.exports={
    admin:admin,
    user:user
}