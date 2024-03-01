import React,{useState,useEffect,memo} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default memo(function AuthLayout({children, authentication = true}) {
    const navigate = useNavigate();
    const authStatus = useSelector(state => state.auth.authStatus);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(authentication && authStatus !== authentication){
            navigate("/login")
        } else if(!authentication && authStatus !== authentication){
            navigate("/")
        }
        setLoading(false)
    }, [authStatus, navigate, authentication])
    
    return loading ? <div className='w-screen h-screen flex justify-center items-center text-3xl font-bold top-0 left-0 fixed bg-gray-200 bg-opacity-50 z-50'
    >Loading...</div> : <>{children}</>
});