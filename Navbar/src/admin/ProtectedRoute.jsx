import { Navigate } from "react-router-dom";


function ProtectedRoute({ children }) {


    const token = localStorage.getItem("adminToken");



    if (!token) {


        return (

            <Navigate to="/movie-hunt-control-panel" />

        );


    }




    return children;


}



export default ProtectedRoute;