
let mongoose = require("mongoose");


const reviewSchema = new mongoose.Schema({
    createdAt:{
        type:Date,
        default:Date.now(),
    },
    rating:{
        type:Number,
        required:true
    },
    comment:{
        type:String,
        required:true
    }
});

const Reviews = mongoose.model("Reviews",reviewSchema);

module.exports= Reviews;