/* 

import { useSignInWithGithub, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useLocation, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import logo from '../../image-logo/logo.png'
import logo2 from '../../image-logo/GitHub-Mark.png'
import logo3 from '../../image-logo/facebook.png'




const SignInWith = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const [signInWithGithub, user1, loading1, error1] = useSignInWithGithub(auth);
    let errorElement;
    let theLoading;

    const navigate = useNavigate();
    const location = useLocation();

    let from = location?.state?.from?.pathname || "/";

    if (user || user1) {
        navigate(from, { replace: true });
    }

    if (error || error1) {

        errorElement = <div>
            <p> Error: {error?.message} {error1?.message}  </p>
        </div>

    }

    if (loading || loading1) {

        theLoading = <div>
            <p>Loading...</p>
        </div>

    }



    const handleGoogleSingIn = () => {
        signInWithGoogle(user)
    }

    const handleGithubSignIn = () => {
        signInWithGithub(user1)
    }


    return (
        <div>
            <div>
                <p style={{ fontSize: '12px', textAlign: 'center', color: 'red' }} > {errorElement} </p>
                <p> {theLoading} </p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }} >
                <div className='w-50 text-primary' >
                    <hr />
                </div>
                <div>
                    <p style={{ color: 'gray' }} className='mx-4 pt-1' >or</p>
                </div>
                <div className='w-50  text-primary'>
                    <hr />
                </div>
            </div>

            <div>
                <button onClick={handleGoogleSingIn} style={{ border: 'none', padding: '10px', display: 'block', margin: 'auto', marginBottom: '10px', width: '230px' }}>

                    <img style={{ height: '30px', width: '30px', marginRight: '10px' }} src={logo} alt="" />

                    Sign in with Google
                </button>
            </div>

            <div>
                <button onClick={handleGithubSignIn} style={{ border: 'none', padding: '10px', display: 'block', margin: 'auto', marginBottom: '10px', width: '230px' }}>

                    <img style={{ height: '30px', width: '30px', marginRight: '10px' }} src={logo2} alt="" />

                    Sign in with Github
                </button>
            </div>

            <div>
                <button style={{ border: 'none', padding: '10px', display: 'block', margin: 'auto', marginBottom: '10px', width: '230px' }}>

                    <img style={{ height: '30px', width: '30px', marginRight: '10px' }} src={logo3} alt="" />

                    Sign in with Facebook
                </button>
            </div>
        </div>
    );
};

export default SignInWith;

*/