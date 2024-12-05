import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";

function PrivateLogin({children}) {

    const token = useSelector(state=>state.authStore.token);
    if(token)
        return <Navigate to="/home" replace></Navigate>
    return children
}


export default PrivateLogin;