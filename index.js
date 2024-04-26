const express = require('express') 
const cors = require('cors')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 5500 ; 

app.use(cors());
app.use(express());


app.get('/',(req,res)=>{
    res.send('data-coming')
})


app.listen(port,()=>{
    console.log(`port running on ${port}`);
})