
const express = require('express');
const axios = require('axios');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 3001;

const mongoUri = "mongodb+srv://solitude666r:Bf3zKK8fIpTfgTCx@cluster0.m4ckkix.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(mongoUri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});



app.use(express.json());


 
app.post('/upload', async (req, res) => {


  try {


        await client.connect();

    
        // Check if the counter collection exists, if not, create it
        const counterCollection = client.db("Cluster0").collection("Counters");
        const counterDoc = await counterCollection.findOneAndUpdate(
            { _id: "textModelCounter" },
            { $inc: { value: 1 } }, // Increment the counter
            { upsert: true, returnDocument: "after" }
        );
    
        // Use the counter value as the custom ID
        const customId = counterDoc.value.value;
        console.log(customId)
        // Insert the document with the custom ID
        const textmodel = client.db("Cluster0").collection("TextModel");
        await client.db("Cluster0").collection("TextModel").insertOne({
            _id: 11,
            text1: req.body.text1,
        });



    //Retrieve most recent text2 from MongoDB
    const latestText2 =  await client.db("Cluster0").collection("TextModel").find({},{_id:0})    
    //const latestText2 = await client.db("Cluster0").collection("TextModel").findOne({}, { sort: { _id: 1 } });

    
        const t1="hello is my house";
        const t2="hello is my horse";

        console.log(latestText2.text);
        // Call Django API for n-gram comparison with text1 and retrieved text2
        const response = await axios.post('http://127.0.0.1:8000/api/ngram-comparison/', {
        'text1': t1 ,//req.body.text1,
        'text2': t2 //latestText2 ? latestText2.text1 : '', 
        });

        const data = response.data;
        const ngrams_similarity = data.similarity;
        res.json({ success: true, 'ngrams_similarity': ngrams_similarity, 'text1':data.text1,'text2':data.text2});
        
    } catch (error) {
         console.error('Error handling upload:', error.message);
         res.status(500).json({ error: 'Internal Server Error' });
                   }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
