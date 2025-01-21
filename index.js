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


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/air7');
};


app.listen(3000,()=>{
    console.log("connected to server");
});

app.use("/listings",listingsroute);
