const Product = require('./models/product');
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/farmStand')
.then(()=>{
    console.log("MONGO CONNECTION OPEN!!!");
})
.catch(err=>{
    console.log("OH NO MONGO ERROR!!!!");
    console.log(err);
})


// const p = new Product({
//     name: 'Ruby Greaphrut',
//     price: 1.99,
//     category:'fruit'

// })
// p.save().then(p =>{
//     console.log(p)
// })
// .catch(e =>{
//     console.log(e);
// })
const seedProducts =[
    {
        name: 'Fairy Eggplant',
        price: 1.00,
        category:'vegetable'
    },
    {
        name: 'Organic Goddess Melon',
        price: 4.99,
        category:'fruit'
    },
    {
        name: 'Organic Mini Seedless Watermelon',
        price:3.99,
        category:'fruit'
    },
    {
        name:'Organic Celery',
        price:1.50,
        category: 'vegetable'
    },
    {
        name:'Chocolate Whole Mild',
        price: 2.69,
        category: 'dairy'
    }
]
Product.insertMany(seedProducts)
.then(res =>{
    console.log(res)
})
.catch(err=>{
    console.log(err)
})
.finally(() => {
    mongoose.connection.close();
});