import {Outlet, useNavigate} from "react-router-dom";
import Sidebar from "./sidebar.jsx";
import TopNav from "./top-nav.jsx";
import Footer from "./footer.jsx";

const MainLayout = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    if (!token) {
        navigate('/login');
    }
    return (
        <div className='wrapper' style={{minHeight: '100vh'}}>
            <Sidebar/>
            <div className='main'>
                <TopNav/>
                <main className='content'>
                    <div className='container-fluid p-0'>
                        <Outlet/>
                    </div>
                </main>
                <Footer/>
            </div>
        </div>
    )
}
export default MainLayout;