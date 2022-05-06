/* 
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';

const AddItems = () => {

    const { register, handleSubmit } = useForm();


    const onSubmit = (data) => {

        const url = 'https://peaceful-headland-64387.herokuapp.com/products'

        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)


        })
            .then(res => res.json())
            .then(result => {
                console.log(result)
                toast('item added')

            })

    }

    return (
        <div>
            <h2>Add New Item</h2>
            <form className='d-flex flex-column w-50 mx-auto' onSubmit={handleSubmit(onSubmit)}>
                <input className='mb-2' placeholder='type name' {...register("name")} />
                <textarea className='mb-2' placeholder='type description' {...register("description")} />
                <input className='mb-2' placeholder='type quantity' {...register("quantity")} />
                <input className='mb-2' placeholder='type price' {...register("price")} />


                <input className='mb-2' placeholder='put photo url' type="text" {...register("img")} />
                <input className='mb-2' placeholder='put supplier name' type="text" {...register("supplier")} />
                <input className='mb-2 btn btn-primary' type="submit" value="Add New Item" />
            </form>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default AddItems;

*/