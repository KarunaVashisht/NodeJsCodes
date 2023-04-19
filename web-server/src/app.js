const fs=require('fs')
const express = require('express')
const hbs = require('hbs')
const path=require('path')
var app=express();
const port=process.env.PORT||3000;
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.use((req,res,next)=>{
    console.log('Executing');
    next();
});

app.use((req,res,next)=>{
var log= `${req.url} ${req.method}`
console.log(log)
fs.appendFile('logfile.log',log+'\n',(err)=>
{
    if(err){console.log('some problem');}
})
next();}
)

app.get('', (req, res) => {
    res.render('index', {
        title: 'LEH LADAKH',
        mail:'www.lehTravels.com'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Phinease'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Phinease'
    })
})


app.get('*', (req, res) => {
res.render('404', {
errorMessage: 'Page not found.'
})
})

app.listen(port,()=>
{
    console.log("server is  ready");
})