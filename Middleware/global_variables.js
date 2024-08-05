
function auth(req, res, next) {
    if(!req.session.isadmin && !req.session.isuser)
    {
        res.locals.isadmin="";
        res.locals.isuser="";
    }else if(req.session.isuser)
    {
        res.locals.isuser = req.session.isuser;
        res.locals.isadmin = false;
    }else
    {
        res.locals.isadmin = req.session.isadmin;
        res.locals.isuser = false;
    }
    //to get the cart number
    if(!req.session.nos)
    {
        req.session.nos=0;
    }
       res.locals.user_name=req.session.user_name
      res.locals.nos=req.session.nos;
    // res.locals.token=req.csrfToken();
    next();
}

module.exports = auth;

