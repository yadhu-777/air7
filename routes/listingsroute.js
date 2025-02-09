const express = require("express");
const router = express.Router();
const Listings = require("../model/listing.js");
const wrapasyn = require("../utils/asyncwrap.js");
const Experr = require("../utils/experr.js");
const ListingValidation = require("../schema.js");
const {islogged} = require("../middleware.js");
const {redirect}  = require("../middleware.js");

const validation = (req,res,next)=>{
   let {error}  = ListingValidation.validate(req.body);
   if(error){
     let errmsg = error.details.map((el)=>el.message).join(",");
     throw new Experr (400,errmsg);
   }else
   next();
}


router.get("/new",islogged,(req,res)=>{
    
     res.render("listings/new.ejs");
});

router.get("/:id/edit",islogged,wrapasyn(async(req,res)=>{
     let {id} = req.params;
    const datafour = await Listings.findById(id);
    if(!datafour){
     req.flash("error","Listings Not Found");
res.redirect("/listings");
    }
    res.render("listings/edit.ejs",{datafour});

}));
router.post("/:id/edit",wrapasyn(async(req,res)=>{
     let {id}  = req.params;
     await Listings.findByIdAndUpdate(id,{...req.body.edit});
     req.flash("start","Listings Updated");
     res.redirect(`/listings/${id}`);

}));


router.get("/:id",wrapasyn(async(req,res)=>{
     let{id} = req.params;
   let dataTwo =   await Listings.findById(id).populate("reviews").populate("owner");
   if(!dataTwo){
     req.flash("error","Listings Not Found");
     res.redirect("/listings");
   }
   res.render("listings/show.ejs",{dataTwo});

}));



router.get("/",wrapasyn(async(req,res)=>{
     const dataOne = await Listings.find();
     
   
     res.render("listings/index.ejs",{dataOne});

   
}));
router.post("/new",validation,wrapasyn(async(req,res)=>{
    const dataThree =  await new Listings(req.body.listings);
    dataThree.owner = req.user._id;
    console.log(req.user);
     await dataThree.save();
     let gg = req.flash("start","Listings Created !");
     res.redirect("/listings");
    
}));
router.delete("/:id",islogged,wrapasyn(async(req,res)=>{
     let {id} = req.params;
     await Listings.findByIdAndDelete(id);
     req.flash("start","Listings Deleted !");
     res.redirect("/listings");
}));








module.exports = router;