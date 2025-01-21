let mongoose = require("mongoose");
let datai = require("./data.js");
 const Listings = require("../model/listing.js");







main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/air7');
};

const initData = async()=>{
    await Listings.deleteMany({});
   let datau =  await Listings.insertMany(datai.data);
    console.log(datau);
}

initData();