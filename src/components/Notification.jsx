import {memo,useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import "../cssFiles/utils.css";
import {removeNotification} from "../store/notificaionSlice.js";

export default memo(function Notifications() {
    const dispatch = useDispatch();
    const notification = useSelector((state)=>state.notification.notification);

    useEffect(() => {
        let timeOut;
        if(notification){
            timeOut = setTimeout(()=>dispatch(removeNotification()),3000)
        }
        return () => {
            if (timeOut) {
                clearTimeout(timeOut);
            }
        }
    },[notification])
  return (
    <div className='fixed top-0 left-0 right-0 h-auto w-screen bg-transparent z-50'>
        {notification && <p className={`flex flex-nowrap justify-between w-72 sm:w-80 md:w-96 ${notification.type} rounded-md`}>
                <span className='w-[85%]'>{notification.text}</span> <button onClick={()=>dispatch(removeNotification())}
                 className='material-symbols-outlined w-[15%]'>close</button>
            </p>}
    </div>
  )
})
