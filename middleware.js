module.exports.islogged = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirect = req.originalUrl;

        req.flash("error","you need to logging !");
        return res.redirect("/login");  
    }
    next();
};

module.exports.redirect= (req,res,next)=>{
    if(req.session.redirect){
        res.locals.redirecturl = req.session.redirect;
    }
    next();
};