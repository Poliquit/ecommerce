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
app.use('/Assets',express.static(path.join(__dirname, 'Assets')));

// For Bootstrap
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));

// Routes
app.get('/', (req, res) => {
    res.render('index');
});
app.get('/register', (req, res) => {
    res.render('register');
});
app.get('/about', (req,res) => {
    res.render('about')
})
app.get('/shop', (req,res) => {
    res.render('shop')
})
app.get('/orders', (req,res) => {
    res.render('orders')
})
app.get('/developers', (req,res) => {
    res.render('developers')
})



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
            res.redirect('/'); // Redirect to login page after registration
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
