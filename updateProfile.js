import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../../firebase.init';

const UpdateProfile = () => {

    const [user] = useAuthState(auth)

    const { uId } = useParams()

    const navigate = useNavigate()

    const updateProfile = (event) => {

        const education = event.target.education.value;
        const location = event.target.location.value;
        const linkdin = event.target.linkdin.value;

        const updateProfileData = {

            education: education,
            location: location,
            linkdin: linkdin
        }

        navigate('dashboard/myProfile')

        // send data to the server:
        const url = `http://localhost:5000/profile/${uId}`
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateProfileData)
        })

            .then(res => {
                console.log(res)
                return res.json()
            })
            .then(data => {
                console.log(data)

                if (data) {
                    toast.success('updated successfully');
                    // event.target.reset()

                }

            })



    }
    return (
        <div>
            <div class="artboard lg:w-1/4 mx-auto border border-emerald-400 p-10 rounded-xl mt-9">


                <h2 className='text-emerald-400 font-bold text-3xl mb-10 uppercase'>Update profile </h2>

                <p className='text-red-400'> ID:{uId}</p><br />

                <form onSubmit={updateProfile} action="">

                    <textarea type="text" name='education' placeholder="Type Education" class="input input-bordered input-primary w-full max-w-xs h-16" required />

                    <input type="text" name='location' placeholder="Type Location City/District" class="input input-bordered input-primary w-full max-w-xs" required /><br /><br />

                    <input type="text" name='linkdin' placeholder="Type Linkdin profile name" class="input input-bordered input-primary w-full max-w-xs" required /><br /><br />

                    <input className='btn btn-primary lg:w-full  text-white  ' type="submit" value="Update" />


                </form>
            </div>
        </div>
    );
};

export default UpdateProfile;



