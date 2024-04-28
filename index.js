//import
const { MongoClient, ServerApiVersion, Long, ObjectId } = require('mongodb');

const express = require('express') 
const cors = require('cors')
require('dotenv').config()

//declare and middlerWire
const app = express()
const port = process.env.PORT || 5500 ; 
app.use(cors());
app.use(express.json());



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
    const userData=client.db('WanderAsiaAdventures').collection('uploadData')


//get-DATA
    app.get('/tourism',async(req,res)=>{
        const data= await tourPlace.find().toArray()
        res.send(data)
    })
    app.get(`/tourism/:id`,async(req,res)=>{
      const id={_id:new ObjectId(req.params.id)}
      const data=await tourPlace.findOne(id)
      res.send(data);
    })
    app.get('/uploadData',async(req,res)=>{
      const data=await userData.find().toArray()
      res.send(data)
    })


    app.get(`/tourSingleDetails/:id`,async(req,res)=>{
      const id={_id:new ObjectId(req.params.id)};
      const data= await userData.findOne(id)
      res.send(data)
      console.log(data);
    })


    app.get(`/myData/:email`,async(req,res)=>{
      const email=req.params.email;
      const data=await userData.find({userEmail:email}).toArray();
      res.send(data)
      console.log(data);
    })


    app.get('/update/:id',async(req,res)=>{
      const id={_id:new ObjectId(req.params.id)};
      const query=await userData.findOne(id)
      res.send(query)
    })



   
    //Put ---- data
    app.put('/update/:id',async(req,res)=>{
      const id={_id:new ObjectId(req.params.id)}
      const updateData=req.body;
      const options = {upsert:true}
      console.log(updateData);
      const updatedToServer={
        $set:{
          image:updateData.image,
          tourists_spot_name:updateData.tourists_spot_name,
          country_Name:updateData.country_Name,
          location:updateData.location,
          description:updateData.description,
          cost:updateData.cost,
          seasonality:updateData.seasonality,
          travel_time:updateData.travel_time,
          totalVisitorsPerYear:updateData.totalVisitorsPerYear,
        }
      };
      const result=await userData.updateOne(id,updatedToServer,options)
      res.send(result)


    })



//post----DATA

    app.post('/uploadData',async(req,res)=>{
      const data=req.body;
      const result=await userData.insertOne(data)
      res.send(result)
      console.log(data);
    
    })

    //Delete --Data
    app.delete('/delete/:id',async(req,res)=>{
      const id=req.params.id
      const query={_id:new ObjectId(id)}
      const result=await userData.deleteOne(query)
      res.send(result)
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