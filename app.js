const express = require('express');
const app = express();
const router = require('./routes/router');
const path = require('path');
const bodyParser = require('body-parser');
require('./database/conn')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.static(path.join(__dirname, 'public')));
 

app.get('/',router);
app.get('/register',router);
app.post('/register',router);
app.get('/upload',router);
app.post('/upload',router);
app.get('/delete/:id',router);
app.get('/edit/:id',router);
app.post('/update/',router);
module.exports = app;