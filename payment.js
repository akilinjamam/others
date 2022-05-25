import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import Loading from '../../Shared/Navbar/Loading/Loading';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import ChackoutForm from './CheckOutForm';


const stripePromise = loadStripe('pk_test_51L15LfKpSPax7dcfMZ89vfrtxD74FXCoHQxfECkNmY4DgCTBldyhKs2dx9vlCc0pIQiGzJSekN7S6WqtaJce7q5U00394Xi0lv');


const Payment = () => {

    const { id } = useParams()
    const url = `http://localhost:5000/orders/${id}`
    const { data: orders, isLoading } = useQuery(['orders', id], () => fetch(url, {
        method: 'GET',

    }).then(res => res.json()))

    if (isLoading) {
        return <Loading></Loading>
    }

    console.log(orders)


    // calculation total Price
    const perUnitPrice = parseInt(orders.pricePerUnit)
    const totalQuantities = parseInt(orders.orderQuantity)

    const totalOrderPrice = perUnitPrice * totalQuantities

    return (
        <div>
            <br />
            <div class="hero min-h-screen bg-base-200">
                <div class="hero-content flex-col ">


                    <div class="card w-full bg-base-100 shadow-xl">
                        <div class="card-body font-bold">
                            <h2 class="card-title"> </h2>
                            <p className='font-bold'>Hellow, {orders.userName}  </p>
                            <p>Your Order: {orders.partsName} </p>
                            <p >Total Parts Quantity: <span className='text-red-900'>{orders.orderQuantity}</span> </p>
                            <p >Price/Unit: <span className='text-red-900'>{orders.pricePerUnit}</span> </p>
                            <p >Address: <span className='text-red-900'>{orders.address}</span> </p>
                            <p >phone: <span className='text-red-900'>{orders.phone}</span> </p>
                            <p>Please Pay Total : {totalOrderPrice} TK </p>
                            <div class="card-actions justify-end">

                            </div>
                        </div>


                    </div>


                    <div class="card w-full bg-pink-100 shadow-xl">
                        <div class="card-body">
                            <Elements stripe={stripePromise}>
                                <ChackoutForm orders={orders} />
                            </Elements>

                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;