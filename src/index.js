const express = require('express');
const app = express(); 

const personRoute = require('./routes/person');
const customerRoute = require('./routes/customer');
const contactUsFormRoute = require('./routes/contactus');
const customerContactUsRoute = require('./routes/customer.contactus');
const product = require('./routes/product');
const productDetail = require('./routes/productDetail');


const mongoose = require('mongoose');
mongoose.connect(
    'mongodb://rnstuser1:rnst123@ds249092.mlab.com:49092/ranasteel', 
    {
        server: {
          socketOptions: {
            socketTimeoutMS: 0,
            keepAlive: true
          },
          reconnectTries: 30
        },
        replset: {
          socketOptions: {
            socketTimeoutMS: 0,
            keepAlive: true
          },
          reconnectTries: 30
        },
        mongos: {
          socketOptions: {
            socketTimeoutMS: 0,
            keepAlive: true
          },
          reconnectTries: 30
        }
      })


const path = require('path');

const bodyParser = require('body-parser');

app.use(bodyParser.json())

app.use( (req, res, next) => {
    console.log(`${new Date().toString()} => ${req.originalUrl}`)
    //res.send('')
    next()

});

app.use('/api', customerRoute);
app.use('/api', customerContactUsRoute);
app.use('/api', personRoute);
app.use('/api', productDetail);
app.use('/api', product);
app.use('/api', contactUsFormRoute);

// app.use('/api', customerRoute);
app.use(express.static('public'));

//Handler for 404 - Page not found

app.use( (req, res, next) => {
    res.status(404).send("we lost you")
});

//Handler for 500 - Internal server error 

app.use( (err, req, res, next) => {
    console.error(err.stack)
    res.sendFile(path.join(__dirname, '../public/500.html'))
});


const PORT = process.env.PORT || 3500 ;
app.listen(PORT, () => console.info(`Server has started on port ${PORT}`));
