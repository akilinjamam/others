const express = require('express')
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
require('dotenv').config();
const port = process.env.PORT || 5000


// middle ware
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('this is royal auto parts')
})

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.sq1ca.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

console.log(uri)


async function run() {

    try {
        await client.connect();
        console.log('connected assignment server')

        const partsCollection = client.db('royal_autoparts').collection('parts')
        const orderCollection = client.db('royal_autoparts').collection('orders')
        //----------------------------------------------------------------------


        app.get('/parts', async (req, res) => {
            const query = {};
            const cursor = await partsCollection.find(query).toArray()

            res.send(cursor);
        })

        app.get('/parts/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const parts = await partsCollection.findOne(query);
            res.send(parts)
        })

        app.post('/orders', async (req, res) => {

            const orders = req.body;
            const result = await orderCollection.insertOne(orders);
            res.send(result)
        })

        // getting all orders according to individual email address 
        app.get('/orders', async (req, res) => {

            const email = req.query.email
            const query = { email: email }
            const cursor = orderCollection.find(query)
            const myOrders = await cursor.toArray()
            res.send(myOrders);
        })

    }




    finally {

    }
}

run().catch(console.dir)

