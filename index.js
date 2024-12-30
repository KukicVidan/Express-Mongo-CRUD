const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');

const Product = require('./models/product');

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(express.static('public')); // Serve static files



const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/farmStand')
.then(()=>{
    console.log("MONGO CONNECTION OPEN!!!");
})
.catch(err=>{
    console.log("OH NO MONGO ERROR!!!!");
    console.log(err);
})



// AKA index :D
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

//TO delete product !!!!methodOverride!!!!
app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    console.log(`Attempting to delete product with ID: ${id}`); 
    try {
        const result = await Product.deleteOne({ _id: id });
        if (result.deletedCount === 0) {
            console.log(`Product with ID ${id} not found`); 
            res.status(404).send('Product not found');
        } else {
            console.log(`Deleted product with ID: ${id}`);
            res.redirect('/products');
        }
    } catch (err) {
        console.error("Error deleting product", err);
        res.status(500).send('Failed to delete product');
    }
});

//Route to update product
app.get('/products/:id/edit',async(req,res)=>{
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/edit',{product});
})
app.put('/products/:id', async (req, res) => {
    const { id } = req.params;  // Extract ID from params
    const { name, price, category } = req.body;  // Extract the new values from the form

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            id, 
            { name, price, category },
            { new: true }  // This returns the updated document
        );
        res.redirect(`/products/${updatedProduct._id}`);  // Redirect to the product's page
    } catch (err) {
        console.error("Error updating product:", err);
        res.status(500).send('Failed to update product');
    }
});


app.listen(3000,()=>{
    console.log('APP IS LISTENING ON PORT 3000!')
});
