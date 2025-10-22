function notFound(req,res,next){
    res.status(404);
    return res.render('index',{tittle:'404',error:'page not found'})
}

function errorHandler(err,req,res,next){
    console.error(err);
    const status = err.status||500;
    res.status(status).render('index', {tittle:'Error',error: err.message||'Server Error'})
}

module.exports = {notFound,errorHandler};