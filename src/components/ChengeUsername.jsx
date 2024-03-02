import React,{useState} from 'react'
import { authService } from '../apiServices/authService';
import { useDispatch } from 'react-redux';
import { setNotification } from '../store/notificaionSlice';
import { login } from '../store/authSlice';

export default function ChengeUsername({username}) {
    const [newUsername,setNewUsername] = useState(username? username : "");
    const labelClass="text-black font-semibold block mb-1";
    const inputClass="bg-gray-100 text-black w-full py-3 px-4 font-semibold rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
    const dispatch = useDispatch();

    function isValidUsername(inputString) {
        // Check if the string starts or ends with "-"
        if (inputString.startsWith('-') || inputString.endsWith('-')) {
          return false;
        }
        // Check if the string contains spaces, special characters (except "-"), or capital letters
        if (/[\sA-Z!@#$%^&*()_+={}[\]:;<>,.?~\\\/]/.test(inputString)) {
          return false;
        }
        // Check if the string starts with a number
        if (/^\d/.test(inputString)) {
          return false;
        }
        // If all conditions are met, return true
        return true;
    }

    const handelSubmit = async () => {
        const confirmaion = window.confirm("Are you sure you want to change your username?");
        if(!confirmaion) return;
        if (!newUsername.trim()) {
            dispatch(setNotification({text:"Username is required",type:"error"}));
            return;
        }
        if (newUsername.trim() === username) {
            return;
        }
        if (!isValidUsername(newUsername)) {
            dispatch(setNotification({text:"Invalid username",type:"error"}));
            return;
        }
        const response = await authService.changeUsername({username:newUsername});

        if(response.status < 400 && response.data){
            dispatch(setNotification({text:"Username Changed",type:"success"}));
            dispatch(login(response.data));
        } else {
            dispatch(setNotification({text:response.message,type:"error"}));
        }
    }

  return (
    <div className='w-full px-8 my-4 md:w-[55%] lg:w-[40%] mx-auto'>

            <label htmlFor="username" className={labelClass}>
                uaername : 
            </label>
            <input type="text"
            id='username'
            value={newUsername}
            className={inputClass}
            onChange={(e) => {
                setNewUsername(e.target.value);
            }}
            />

            <button onClick={handelSubmit} disabled={username === newUsername.trim()}
            className='bg-blue-500 text-white w-full py-3 px-4 font-semibold rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out mt-4 cursor-pointer hover:bg-blue-600'
            >Change Username</button>
        
    </div>
  )
}
