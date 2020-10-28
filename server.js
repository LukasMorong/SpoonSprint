const express = require('express');
const app = express();
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//parser
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());


//router
app.use('/api', routes);

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log('listening on ' + port)
})

app.get('/', (req, res) => {
    res.send(':)');
})


//database
const dbPath = 'mongodb://g0d:h3sl00@ds127736.mlab.com:27736/spoonsprint';
const options = {useNewUrlParser: true, useUnifiedTopology: true};
const mongo = mongoose.connect(dbPath, options);

mongo.then(() => {
    console.log('connected to database');
},  error => {
    console.log(error, 'error');
});