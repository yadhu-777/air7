let mongoose = require("mongoose");
const express = require("express");
const app = express();
const listingsroute = require("./routes/listingsroute.js");
const ejs = require("ejs");
app.set("view engine" ,"ejs");
const path = require("path");
app.set("views",path.join(__dirname,"views"));
const ejsmate = require("ejs-mate");
app.engine('ejs', ejsmate);
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"/public")));
const methodOverride = require('method-override')
app.use(methodOverride("_method"));
const Experr = require("./utils/experr.js");
const  reviewroutes = require("./routes/reviewroutes.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./model/user.js");
const userRoute = require("./routes/userroute.js");

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/air7');
};


app.listen(3000,()=>{
    console.log("connected to server");
});
const sessionOpstions ={
  secret:"yahsko",
  resave:false,
  saveUninitialized:true,
  cookie:{
    expires:Date.now() +7*24 *60*60*1000,
    maxAge:Date.now() +7*24 *60*60*1000,
    httpOnly:true
  }
}

app.use(session(sessionOpstions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy (User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req,res,next)=>{
  res.locals.msg= req.flash("start");
  res.locals.error=req.flash("error");
  res.locals.curruser = req.user;
  next();
});
app.use("/listings",listingsroute);
app.use("/rev/:id",reviewroutes);
app.use("/",userRoute);



app.use((err,req,res,next)=>{
 let {status = 500,message="something wrong"} = err;
 res.status(status).render("listings/error.ejs",{message});
});
