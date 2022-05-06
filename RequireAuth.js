/* 

import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import auth from "../../firebase.init";
import Spin from "../Spinner/Spinner";

const RequireAuths = ({ children }) => {
    const [user, loading] = useAuthState(auth);
    const location = useLocation();
    console.log(user)

    if (loading) {
        return <Spin></Spin>

    }

    if (!user) {
        return <Navigate to='/login' state={{ from: location }} replace />
    }


    return children
};

export default RequireAuths;

*/