const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,

    },
    price:{
        type: Number,
        required: true,
        min: 0
    },
    category:{
        lowercare: true,
        type:String,
        enum:['fruit','vegetable','dairy']
    },
})

const Product = mongoose.model('Product', productSchema);
module.exports = Product;