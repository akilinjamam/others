// users profile API
app.post('/profile', async (req, res) => {

    const profile = req.body;
    const result = await profileCollection.insertOne(profile);
    res.send(result)
})


app.get('/profile', async (req, res) => {
    const query = {};
    const cursor = await profileCollection.find(query).toArray()

    res.send(cursor);
})


app.get('/profile', async (req, res) => {

    const email = req.query.email
    const query = { email: email }
    const cursor = profileCollection.find(query)
    const profile = await cursor.toArray()
    res.send(profile)
})


app.put('/profile/:id', async (req, res) => {
    const id = req.params.id;
    const updateProfileData = req.body
    const filter = { _id: ObjectId(id) }
    const options = { upsert: true }
    const updateDoc = {
        $set: {

            education: updateProfileData.education,
            location: updateProfileData.location,
            linkdin: updateProfileData.linkdin,
        }
    };

    const result = await profileCollection.updateOne(filter, updateDoc, options);
    res.send(result)
})