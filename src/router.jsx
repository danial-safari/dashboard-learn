import { createBrowserRouter } from "react-router-dom";
import Login from "./features/Identity/components/login";
import Register from "./features/Identity/components/register";

const router = createBrowserRouter([
    {
        path: 'login',  
        element: <Login />,
    },
    {
        path: 'register',  
        element: <Register />,
    }
]);

export default router;