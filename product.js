/* 
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Products.css'
import deleteIcon from '../../icon/delete.png'

const Products = ({ product }) => {
    const { quantity, img, description, name, _id } = product

    const navigate = useNavigate()

    const handleButton = (id) => {
        navigate(`/products/${id}`)
    }
    return (
        <div>
            <div className='photo-album'>

                <div className='photo-frame'>
                    <div className='photo'>
                        <img src={img} alt="" />
                    </div>

                    <div className='photo-detailed'>

                        <div className='background'>

                            <h3>{name}</h3>

                            <p title={description}>Description: {description.length > 20 ? description.slice(0, 20) + '...' : description}  </p>
                            <p>Quantity: {quantity} </p>
                            <button onClick={() => handleButton(_id)} className='btn btn-primary'> Stock Update </button>



                        </div>



                    </div>
                </div>
            </div>
            <br />
        </div>

    );
};

export default Products;

*/