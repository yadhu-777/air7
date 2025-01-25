const express = require("express");
const router = express.Router({ mergeParams:true }); 
const Listings = require("../model/listing.js");
const wrapasyn = require("../utils/asyncwrap.js");
const Experr = require("../utils/experr.js");
const Review = require("../model/review.js");

router.post("/",async(req,res)=>{
   let {id} = req.params;
   const revlistings = await Listings.findById(id);
   const revdata = new Review(req.body.review);
   await revdata.save();
   revlistings.reviews.push(revdata);
   await revlistings.save();
   res.redirect(`/listings/${id}`);

    
});

router.delete("/:revid",async(req,res)=>{
   let{id,revid} = req.params;
   await Listings.findByIdAndUpdate(id,{$pull:{reviews:revid}});
   await Review.findByIdAndDelete(revid);
   res.redirect(`/listings/${id}`);
})
module.exports=router;