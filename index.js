const express = require('express');
const app = express();
const path = require('path');

const Product = require('./models/product');

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}))


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/farmStand')
.then(()=>{
    console.log("MONGO CONNECTION OPEN!!!");
})
.catch(err=>{
    console.log("OH NO MONGO ERROR!!!!");
    console.log(err);
})




app.get('/products',async (req,res)=>{
    const products = await Product.find({}); //db.products.find()
    res.render('products/index',{products});//<- Ovaj drugi argument mi govori da na ovom routu mogu koristiti {products}object
})
//To create new prodct
app.get('/products/new',(req,res)=>{
    res.render('products/new');
})
// Logic of adding new product to DB
app.post('/products',async(req,res)=>{
    try{
    const {name,price,category} = req.body;
    const newProduct = new Product({ name, price, category });
    await newProduct.save();
    res.redirect(`products/${newProduct._id}`);

    }catch (err){
        console.error(err);
        res.status(500).send("failed to save product")

    }
    
})

app.get('/products/:id',async (req,res)=>{
    const {id} = req.params;
    const product = await Product.findById(id);
    console.log(product)
    res.render('products/show',{product})
})


app.listen(3000,()=>{
    console.log('APP IS LISTENING ON PORT 3000!')
});