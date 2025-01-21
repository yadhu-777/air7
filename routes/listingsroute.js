const express = require("express");
const router = express.Router();
const Listings = require("../model/listing.js");

router.get("/:id",async(req,res)=>{
     let{id} = req.params;
   let dataTwo =   await Listings.findById(id);
   res.render("listings/show.ejs",{dataTwo});

});

router.get("/",async(req,res)=>{
     const dataOne = await Listings.find();
     res.render("listings/index.ejs",{dataOne});

   
});




module.exports = router;