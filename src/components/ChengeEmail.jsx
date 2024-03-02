import React,{useState} from 'react'
import { authService } from '../apiServices/authService';
import { useDispatch } from 'react-redux';
import { setNotification } from '../store/notificaionSlice';
import { login } from '../store/authSlice';

export default function ChengeEmail({email}) {
    const [newEmail,setNewEmail] = useState(email? email : "");
    const labelClass="text-black font-semibold block mb-1";
    const inputClass="bg-gray-100 text-black w-full py-3 px-4 font-semibold rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
    const dispatch = useDispatch();

    function validateEmail(email) {
        // Regular expression for a basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
        // Test the email against the regular expression
        return emailRegex.test(email);
    }

    const handelSubmit = async () => {
        const confirmaion = window.confirm("Are you sure you want to change your username?");
        if(!confirmaion) return;
        if (!newEmail.trim()) {
            dispatch(setNotification({text:"Email is required",type:"error"}));
            return;
        }
        if (newEmail.trim() === email) {
            return;
        }
        if (!validateEmail(newEmail)) {
            dispatch(setNotification({text:"Invalid email",type:"error"}));
            return;
        }
        const response = await authService.changeEmail({email:newEmail});

        if(response.status < 400 && response.data){
            dispatch(setNotification({text:"Email Changed",type:"success"}));
            dispatch(login(response.data));
        } else {
            dispatch(setNotification({text:response.message,type:"error"}));
        }
    }
    
  return (
    <div className='w-full px-8 my-4 md:w-[55%] lg:w-[40%] mx-auto'>

            <label htmlFor="Email" className={labelClass}>
                Email : 
            </label>
            <input type="email"
            id='Email'
            value={newEmail}
            className={inputClass}
            onChange={(e) => {
                setNewEmail(e.target.value);
            }}
            />

            <button onClick={handelSubmit} disabled={newEmail.trim() === email}
            className='bg-blue-500 text-white w-full py-3 px-4 font-semibold rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out mt-4 cursor-pointer hover:bg-blue-600'
            >Change Email</button>
        
    </div>
  )
}
