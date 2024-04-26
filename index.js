//import
const { MongoClient, ServerApiVersion, Long } = require('mongodb');

const express = require('express') 
const cors = require('cors')
require('dotenv').config()

//declare and middlerWire
const app = express()
const port = process.env.PORT || 5500 ; 
app.use(cors());
app.use(express());



// const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@cluster0.4mwwnz0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// console.log(uri);
const uri=`mongodb://localhost:27017`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    //access data base
    const tourPlace=client.db('WanderAsiaAdventures').collection('tourism')

    app.get('/tourism',async(req,res)=>{
        const data= await tourPlace.find().toArray()
        res.send(data)
    })
   



        
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
  }
}
run().catch(console.dir);





app.get('/',(req,res)=>{
    res.send('data-coming')
})


app.listen(port,()=>{
    console.log(`port running on ${port}`);
})