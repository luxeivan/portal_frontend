import { Navigate, Outlet, Route, useLocation } from "react-router-dom";
import useAuth from "../stores/useAuth";

const PrivateRoute = (props) => {
    const location = useLocation()
    const setRedirection = useAuth(state => state.setRedirection);
    const auth = useAuth(state => state.auth);

    //   if (authStore.isLoadingAuth) {
    //     return <div>Checking auth...</div>;
    //   }
    // console.log(location.pathname)
    if (auth) {
        return <Outlet />
    } else {
        setRedirection(location.pathname)
        return <Navigate to="/login" />;
    }
};

export default PrivateRoute;