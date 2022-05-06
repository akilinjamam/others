/* 

const express = require('express');
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// const ObjectId = require('mongodb').ObjectId

const app = express();
const port = process.env.PORT || 5000;


// middle-ware:
app.use(cors());
app.use(express.json());



// user-name: dbuser1
// Lss2Z4mbh6kVIV4i


// mongodb:
const uri = "mongodb+srv://dbuser1:k9zuJGbjZzkEd3vX@cluster0.8g7kb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {

    try {

        await client.connect();
        const userCollection = client.db('foodExpress').collection('user');

        app.get('/user', async (req, res) => {

            const query = {};
            const cursor = userCollection.find(query);
            const users = await cursor.toArray();
            res.send(users);
        });

        app.get('/user/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await userCollection.findOne(query)
            res.send(result)
        })
        // updating to server
        app.put('/user/:id', async (req, res) => {
            const id = req.params.id;
            const updateUser = req.body
            const filter = { _id: ObjectId(id) }
            const options = { upsert: true }
            const updateDoc = {
                $set: {
                    name: updateUser.name,
                    email: updateUser.email
                }
            };

            const result = await userCollection.updateOne(filter, updateDoc, options);
            res.send(result)
        })

        app.post('/user', async (req, res) => {
            const newUser = req.body;
            const result = await userCollection.insertOne(newUser)
            console.log('adding new user', newUser);
            res.send(result)
        })
        // deletet from server
        app.delete('/user/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const result = await userCollection.deleteOne(query)
            res.send(result);

        })
    }
    finally {

    }
}

run().catch(console.dir)





app.get('/', (req, res) => {
    res.send('Running my node CRUD server')
})

app.listen(port, () => {
    console.log('crud server is running')
})




/* ------------------------------------------------- */






/* 


async function run() {

    try {
        await client.connect();
        const userCollection = client.db("foodExpress").collection("user");
        const user = { name: 'mahiya mahi', email: 'mahiya@gmail.com', number: '0176222222' };
        const result = await userCollection.insertOne(user);
        console.log(`user inserted with id: ${result.insertedId}`)
    }
    finally {
        await client.close();
    }

}

run().catch(console.dir);


*/


