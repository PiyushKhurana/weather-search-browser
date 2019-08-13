const express = require('express');
const hbs = require('hbs');
const path = require('path');


const app = express();
const port = 3000;

const publicPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicPath));



app.listen(port,()=>{
    console.log(`Server is up and running at port ${port}`);
});