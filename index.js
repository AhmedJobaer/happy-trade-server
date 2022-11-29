const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const jwt = require('jsonwebtoken');
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
        const productCollections = client.db('happyTrade').collection('products');
        const usersCollections = client.db('happyTrade').collection('users');


        app.get('/categorySection', async (req, res) => {
            const query = {};
            const section = await categoryCollections.find(query).toArray();
            res.send(section);
        })


        app.get('/products/:id', async (req, res) => {
            const id = req.params.id;
            const query = { category_id: id };
            const products = await productCollections.find(query).toArray();
            res.send(products);
        })



        /* app.get('/jwt', async (req, res) => {
            const email = req.query.email;
            const query = { email: email };
            const user = await usersCollections.findOne(query);
            if (user) {
                const token = jwt.sign({ email }, process.env.ACCESS_TOKEN, { expiresIn: '1h' })
                return res.send({ accessToken: token });
            }
            console.log(user);
            res.status(403).send({ accessToken: '' })
        }) */

        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await usersCollections.insertOne(user);
            res.send(result);
        })

        app.get('/allUser', async (req, res) => {
            const query = {};
            const user = await usersCollections.find(query).toArray();
            res.send(user);
        })
    }
    finally {

    }
}
run().catch(console.log)

app.get('/', async (req, res) => {
    res.send('happy trade server is running!')
})

app.listen(port, () => console.log(`happy trade server is running! ${port}`));