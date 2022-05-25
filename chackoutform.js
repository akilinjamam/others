import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';

const ChackoutForm = ({ orders }) => {
    const [clientSecret, setClientSecret] = useState('')
    const stripe = useStripe();
    const elements = useElements()
    const [cartError, setCartError] = useState('')
    const [success, setSuccess] = useState('')
    const [transactionId, setTransactionId] = useState('')
    const [processing, setProcessing] = useState('')


    const { _id, pricePerUnit, userName, userEmail } = orders;

    useEffect(() => {
        fetch('http://localhost:5000/create-payment-intent', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',

            },
            body: JSON.stringify({ pricePerUnit })

        })

            .then(res => res.json())
            .then(data => {
                if (data?.clientSecret) {
                    console.log(data.clientSecret)
                    setClientSecret(data.clientSecret)
                }
            })
    }, [pricePerUnit])

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card

        })

        if (error) {
            setCartError(error?.message);
            setSuccess('');
        } else {
            setCartError('')
        }

        setProcessing(true)

        // confirm card payment

        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: userName,
                        email: userEmail
                        ,

                    },
                },
            },


        );

        if (intentError) {
            setCartError(intentError?.message);
            setSuccess('')
            setProcessing(false)
        }
        else {

            setCartError('');
            console.log(paymentIntent)
            setTransactionId(paymentIntent.id)
            setSuccess('Congrates! your payment is complete')

            //store payment on database

            const payment = {
                orders: _id,
                transactionId: paymentIntent.id
            }

            fetch(`http://localhost:5000/orders/${_id}`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json',

                },
                body: JSON.stringify(payment)

            }).then(res => res.json())
                .then(data => {
                    console.log(data)
                    setProcessing(false)
                })
        }




    }
    return (
        <div className='text-left'>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <br /><br />
                <button type="submit" disabled={!stripe || !clientSecret} class="btn btn-primary text-white">Confirm Order</button>

            </form>

            <div>
                {
                    cartError && <p className='text-red-400'> {cartError} </p>
                }
                {
                    success &&
                    <div>
                        <p className='text-green-400'> {success} </p>
                        <p className='text-green-400'> Your Transaction ID: <span className='font-bold text-orange-600'> {transactionId} </span> </p>
                    </div>


                }
            </div>
        </div>
    );
};

export default ChackoutForm;