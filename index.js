const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const port = process.env.PORT || 5000;

const app = express();


app.use(cors());
app.use(express.json());



//const uri = "mongodb+srv://<username>:<password>@cluster0.r2o8evu.mongodb.net/?retryWrites=true&w=majority";
const uri = "mongodb://localhost:27017";
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const categoryCollections = client.db('happyTrade').collection('category');

        app.get('/categorySection', async (req, res) => {
            const query = {};
            const section = await categoryCollections.find(query).toArray();
            res.send(section);
        })
    }
    finally {

    }
}
run().catch(console.log)

app.get('/', async (req, res) => {
    res.send('happy trade server is running!')
})

app.listen(port, () => console.log(`Doctors portal running on ${port}`));