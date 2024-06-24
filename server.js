const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user'); 
const path = require('path');
const app = express();
const port = 3000;

// Set up view engine and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/categories')));
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use('/Assets',express.static(path.join(__dirname, 'Assets')));

// For Bootstrap


// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'demo.html'));
});
app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/index/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});
app.get('/index/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});
app.get('/index/shop', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'shop.html'));
});
app.get('/index/orders', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'orders.html'));
});
app.get('/index/developers', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'developers.html'));
});
app.get('/artworks', (req,res) => {
    res.sendFile('/categories/artworks.html')
})
app.get('/fashionstyles', (req,res) => {
    res.sendFile('/categories/fashionstyles.html')
})
app.get('/furnitures', (req,res) => {
    res.sendFile('/categories/furnitures.html')
})
app.get('/home-decoration', (req,res) => {
    res.sendFile('/categories/homedecor.html')
})


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
