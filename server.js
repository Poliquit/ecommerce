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
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use('/Assets',express.static(path.join(__dirname, 'Assets')));

// For Bootstrap
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));

// Routes
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


// Connect to MongoDB database
mongoose.connect('mongodb://localhost:27017/ecommerce', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// POST route for registering a new user
app.post('/register', (req, res) => {
    const newUser = new User({
        username: req.body.username,
        password: req.body.password,
    });

    newUser.save()
        .then(user => {
            res.redirect('/index'); // Redirect to login page after registration
        })
        .catch(err => {
            console.error(err);
            res.status(400).send("Error registering user");
        });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
