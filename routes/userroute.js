const express = require("express");
const router = express.Router(); 
const User = require("../model/user.js");
const passport = require("passport");

const wrapasyn = require("../utils/asyncwrap.js");
const {redirect}  = require("../middleware.js");


router.post("/login",redirect,passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),async(req,res)=>{
  req.flash("start","You Are Logged Inn");
  let urlredirect = res.locals.redirecturl ||  "/listings";
  res.redirect(urlredirect);


});


router.get("/logout",(req,res,next)=>{
  req.logout((err)=>{
    if(err){
      return next(err);

    }
    req.flash("start","you are logged out");
  res.redirect("/listings");
 
  })
  
});


router.get("/login",(req,res)=>{
    res.render("listings/login.ejs");
});




router.post("/signup",wrapasyn(async(req,res)=>{
  try{
    let{email ,username,password} = req.body;
    const newuser =  new User({email,username});
    let reguser = await User.register(newuser,password);
    req.login(reguser,(err)=>{
      if(err){
        return next(err);
      }
      req.flash("start","success");
res.redirect("/listings");


    })
    
  }catch(e){
    req.flash("error",e.message);
    res.redirect("/signup");
  }
    
}));



router.get("/signup",(req,res)=>{
    res.render("listings/user.ejs");
});



module.exports= router;