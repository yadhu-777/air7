const express = require("express");
const router = express.Router();
const Listings = require("../model/listing.js");
const wrapasyn = require("../utils/asyncwrap.js");
const Experr = require("../utils/experr.js");
const ListingValidation = require("../schema.js");


const validation = (req,res,next)=>{
   let {error}  = ListingValidation.validate(req.body);
   if(error){
     let errmsg = error.details.map((el)=>el.message).join(",");
     throw new Experr (400,errmsg);
   }else
   next();
}


router.get("/new",(req,res)=>{
    
     res.render("listings/new.ejs");
});

router.get("/:id/edit",wrapasyn(async(req,res)=>{
     let {id} = req.params;
    const datafour = await Listings.findById(id);
    res.render("listings/edit.ejs",{datafour});

}));
router.post("/:id/edit",wrapasyn(async(req,res)=>{
     let {id}  = req.params;
     await Listings.findByIdAndUpdate(id,{...req.body.edit});
     res.redirect(`/listings/${id}`);

}));


router.get("/:id",wrapasyn(async(req,res)=>{
     let{id} = req.params;
   let dataTwo =   await Listings.findById(id).populate("reviews");
  
   res.render("listings/show.ejs",{dataTwo});

}));



router.get("/",wrapasyn(async(req,res)=>{
     const dataOne = await Listings.find();
     req.flash("start","welcome to Airbnb");
     res.render("listings/index.ejs",{dataOne});

   
}));
router.post("/new",validation,wrapasyn(async(req,res)=>{
    const dataThree =  await new Listings(req.body.listings);
     await dataThree.save();
     let gg = req.flash("start","welcome to Airbnb");
     res.redirect("/listings");
    
}));
router.delete("/:id",wrapasyn(async(req,res)=>{
     let {id} = req.params;
     await Listings.findByIdAndDelete(id);
     res.redirect("/listings");
}));








module.exports = router;