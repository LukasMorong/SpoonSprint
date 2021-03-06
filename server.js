const express = require('express');
const app = express();
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

//parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


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
const dbPath = 'mongodb+srv://g0d:nimda@cluster0.t0pd8.mongodb.net/spoonsprint';
const options = {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false};
const mongo = mongoose.connect(process.env.MONGODB_URI || dbPath, options);

mongo.then(() => {
    console.log('connected to database');
},  error => {
    console.log(error, 'error');
});