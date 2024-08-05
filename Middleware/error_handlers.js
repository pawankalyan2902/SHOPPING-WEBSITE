//Adding error handlers
//error 404
function error_page_not_found(req,res)
{
    res.status(404).render("404");
};

//error 500
function error_internal_error(error,req,res,next)
{
    console.log(error.message);
    res.status(500).render("500");
};

module.exports={
    error_internal_error:error_internal_error,
    error_page_not_found:error_page_not_found
}