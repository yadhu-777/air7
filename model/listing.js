let mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Reviews = require("./review.js");

const listingsSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },

    image:{
        type:String,
        default:"https://images.unsplash.com/photo-1464146072230-91cabc968266?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        set:(v) =>{
            if(typeof v ==="object" && v.url) return v.url;
            if(typeof v==="string" && v.trim()==="") {
                return "https://images.unsplash.com/photo-1464146072230-91cabc968266?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            return v;
        },
    },

    location:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    reviews:[{
        type:Schema.Types.ObjectId,
        ref:"Reviews"
        
    }]
});

listingsSchema.post("findOneAndDelete",async(data)=>{
    await Reviews.deleteMany({_id :{$in:data.reviews}});
    


})

const Listings = mongoose.model("Listings",listingsSchema);
module.exports = Listings;