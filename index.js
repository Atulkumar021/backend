const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const cors = require('cors')
const Authrouter = require('./Routes/Authrouter')
require('dotenv').config();
require('./Models/db')
const PORT = process.env.PORT ||8080;

app.get('/ping',(req,res)=>{
    res.send("pong");
});
app.use(bodyParser.json())
app.use(cors())
app.use('/auth',Authrouter)
app.listen(PORT,()=>{
    console.log(`server is Running ${PORT}`)
})