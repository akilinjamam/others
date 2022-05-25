//stripe payment-method secret key
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)


// for payment....
app.post('/create-payment-intent', async (req, res) => {
    const orders = req.body;
    const price = orders.pricePerUnit;
    const amount = price * 100;
    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'usd',
        payment_method_types: ['card']
    });
    res.send({ clientSecret: paymentIntent.client_secret })
})



app.patch('/orders/:id', async (req, res) => {
    const id = req.params.id;
    const payment = req.body;
    const filter = { _id: ObjectId(id) };
    const updatedDoc = {
        $set: {
            paid: true,
            transactionId: payment.transactionId,
        }
    }

    const updateOrder = await orderCollection.updateOne(filter, updatedDoc);
    const result = await paymentCollection.insertOne(payment)
    res.send(updatedDoc);
})