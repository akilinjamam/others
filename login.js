/* 
import React from 'react';
import { Button } from 'react-bootstrap';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import Spin from '../Spinner/Spinner';

const Login = () => {

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    let elementError;

    const navigate = useNavigate()


    const handleNavigate = () => {
        navigate('/register')
    }


    const handleSubmit = (event) => {

        event.preventDefault();

        console.log('clicked');

        const email = event.target.email.value;
        const password = event.target.password.value;

        console.log(email, password, 'working?');

        signInWithEmailAndPassword(email, password)
    }


    if (loading) {
        return (<Spin></Spin>)
    }



    if (error) {
        elementError = <div>
            <p className='text-danger'> Error: {error?.message}  </p>
        </div>
    }

    if (user) {
        console.log(user);
        navigate('/')
    }


    return (
        <div>
            <h2>Login Pages</h2>

            <div className='border border-dark rounded p-4 w-75 mx-auto'>
                <form onSubmit={handleSubmit}>

                    <input className='w-50' type="text" name="email" placeholder='type your email' id="" required /> <br /><br />
                    <input className='w-50' type="password" name="password" placeholder='type your password' id="" required /> <br /><br />
                 
                    <p className='text-dark'>Are You new in Exertion? <span style={{ cursor: 'pointer' }} className='text-danger' onClick={handleNavigate}  > Register </span> </p>

                   
                    <div>
                        <p  > {elementError} </p>

                    </div>


                    <Button className='d-block mx-auto mt-3' variant="primary" type="submit">
                        Login
                    </Button>

                </form>
            </div>

            <div style={{ height: '300px' }}>

            </div>
        </div>
    );
};

export default Login;


*/