import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../../firebase.init';

const MyProfile = () => {

    const [user] = useAuthState(auth);

    const navigate = useNavigate()




    const handleProfile = (event) => {

        event.preventDefault();

        const education = event.target.education.value;
        const location = event.target.location.value;
        const linkdin = event.target.linkdin.value

        const profile = {

            name: user.displayName,
            email: user.email,
            education: education,
            location: location,
            linkdin: linkdin

        }



        const email = user?.email
        fetch(`http://localhost:5000/profile?email=${email}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',

            },
            body: JSON.stringify(profile)

        })

            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.insertedId) {
                    toast.success(' saved and got to your profile from dashboard');

                }
            })
    }
    return (
        <div className='bg-base-200 my-5'>

            <br />
            <div class="artboard lg:w-1/4 mx-auto border border-emerald-400 p-10 rounded-xl">

                <form onSubmit={handleProfile} action="">

                    <h2 className='text-emerald-400 font-bold text-3xl mb-10 uppercase'>my profile</h2>
                    <input readOnly type="text" name='name' value={user.displayName} class="input input-bordered input-primary w-full max-w-xs" /><br /><br />

                    <input type="text" name='email' value={user.email} class="input input-bordered input-primary w-full max-w-xs" /><br /><br />

                    <textarea type="text" name='education' placeholder="Type Education" class="input input-bordered input-primary w-full max-w-xs h-16" required />

                    <input type="text" name='location' placeholder="Type Location City/District" class="input input-bordered input-primary w-full max-w-xs" required /><br /><br />

                    <input type="text" name='linkdin' placeholder="Type Linkdin profile name" class="input input-bordered input-primary w-full max-w-xs" required /><br /><br />

                    <input className='btn btn-primary lg:w-full  text-white  ' type="submit" value="SUBMIT" />





                </form>
            </div>
        </div>
    );
};

export default MyProfile;