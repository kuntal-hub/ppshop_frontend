import { Link, NavLink,useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { authService } from '../apiServices/authService';
import { logout } from '../store/authSlice';
import { setNotification } from '../store/notificaionSlice';

export default function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const authStatus = useSelector(state => state.auth.authStatus);
    const user = useSelector(state => state.auth.user);
    

    const handelLogout = async () => {
        const confirmaion = window.confirm("Are you sure you want to logout?");
        if(!confirmaion) return;
        const response = await authService.logout();
        if(response.status < 400 && response.data){
            dispatch(logout());
            dispatch(setNotification({text:"Logout Success",type:"success"}));
            navigate("/login");
        } else {
            dispatch(setNotification({text:response.message,type:"error"}));
        }
    }

    return (
        <div className='flex flex-nowrap justify-between fixed top-0 left-0 h-14 w-screen bg-blue-500'>

        <div className='flex flex-nowrap justify-start ml-2 lg:ml-7'>
            <NavLink to={"/"}
                className={`${({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : ""} pending`}
                >
                Info
            </NavLink>

            <NavLink to={"/entry"}
                className={`${({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : ""} pending`}
                >
                Entry
            </NavLink>

            <NavLink to={"/reports"}
                className={`${({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : ""} pending`}
                >
                Report
            </NavLink>

            {
                user && user.role === "admin" &&
                <NavLink to={"/balance"}
                className={`${({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : ""} pending`}
                >
                    Notes
                </NavLink>
            }

            {
                user && user.role === "admin" &&
                <NavLink to={"/account"}
                className={`${({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : ""} pending`}
                >
                    Account
                </NavLink>
            }
        </div>
        <div className='flex flex-nowrap justify-end lg:mr-7 mr-2'>
            {
                user && user.role === "admin" &&
                <NavLink to={"/admin-panel"}
                className={`${({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : ""} pending`}
                >
                    Settings
                </NavLink>
            }
            {authStatus && 
                <button className='pending hover:text-black' onClick={handelLogout} >
                    Logout
                </button>
            }
        </div>
        </div>
    )
}
