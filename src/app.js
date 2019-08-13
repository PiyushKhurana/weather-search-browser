const express = require('express');
const hbs = require('hbs');
const path = require('path');
const forecast = require('./api/forecast');
const geocode = require('./api/geocode');


const app = express();
const port = 3000;

const publicPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicPath));

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'@Anonymous'
    })
})



app.get('/weather',(req,res)=>{

    if(!req.query.address)
    return res.send({
        error:"You must provide a address"
    });

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error)
        return res.send({error:error});
        forecast(latitude,longitude,(error,data)=>{
            if(error)
            return res.send({error:error});
            
            res.send({
                forecast:data,
                location:location,
                address:req.query.address
            })
        })
    })
})
app.get('*',(req,res)=>{
    res.send("<h1>Dont mess with url !!!</h1> <h2>Error 404  Page Not Found</h2>")
})
app.listen(port,()=>{
    console.log(`Server is up and running at port ${port}`);
});