import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import {authService} from "../apiServices/authService.js";
import {useDispatch} from "react-redux"
import Input from "../components/Input.jsx";
import { setNotification } from '../store/notificaionSlice.js';


export default function ForgotPassword() {
    const { register, handleSubmit } = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [token, setToken] = useState("")
    const [email, setEmail] = useState("")
    const [disabled, setDisabled] = useState(false)
    const labelClass = "font-semibold block mb-1 text-white"
    const inputClass = "bg-gray-100 text-black w-full py-3 px-4 font-semibold rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"

    const handelresetPassword = async (data) => {
        if (!token) {
            dispatch(setNotification({text:"Please send OTP first",type:"error"}))
            return;
        }
        if (data.OTP.trim().length !== 6) {
            dispatch(setNotification({text:"Invalid OTP",type:"error"}))
            return;
        }
        if (data.password.includes(" ")) {
            dispatch(setNotification({text:"Password cannot contain spaces",type:"error"}))
            return;
        }
        if (data.password.trim().length < 8) {
            dispatch(setNotification({text:"Password must be at least 8 characters",type:"error"}))
            return;
        }
        setDisabled(true)
        const response = await authService.resetPassword({token:token,OTP:data.OTP.trim(),password:data.password.trim()})
        if(response.status <400 && response.data){
            dispatch(setNotification({text:"Password reset success",type:"success"}))
            navigate("/login")
        } else {
            dispatch(setNotification({text:response.message,type:"error"}))
            setDisabled(false)
        }
    }

    const sendOTP = async () => {
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            dispatch(setNotification({text:"Invalid Email",type:"error"}))
            return;
        }
        setDisabled(true)
        const response = await authService.requestForgotPasswordEmail({email:email})

        if(response.status <400 && response.data){
            dispatch(setNotification({text:"OTP sent to your email",type:"success"}))
            setToken(response.data.token)
            setDisabled(false)
        } else {
            dispatch(setNotification({text:response.message,type:"error"}))
            setDisabled(false)
        }
    }

  return (
    <div className='w-screen h-screen fixed top-0 left-0 grid place-content-center bg-white'>
        <div className='text-center p-6 bg-gray-700 rounded-lg lg:w-[35vw] md:w-[45vw] sm:w-[60vw]'>
            <h1 className='text-3xl text-white font-bold mb-6'>
                Forgot Password
            </h1>
                <label htmlFor="email" className={labelClass}>Email :</label>
                <input type="email" name="email" id="email" className={inputClass}
                placeholder='Enter your email here' required={true}
                value={email} onChange={(e)=>setEmail(e.target.value)}
                />
                <br />
                <button onClick={sendOTP} disabled={disabled}
                className='bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold cursor-pointer hover:bg-blue-600 transition duration-300 ease-in-out my-3'
                >
                    Send OTP
                </button>
                <form onSubmit={handleSubmit(handelresetPassword)}>
                    <Input 
                    type="text"
                    labelClass={labelClass}
                    lable="OTP"
                    {...register("OTP",{required:true})}
                    required={true}
                    placeholder="Enter your OTP here"
                    /> <br /><br />

                    <Input
                    type="password"
                    lable="New Password (min 8 characters)"
                    labelClass={labelClass}
                    {...register("password",{required:true})}
                    required={true}
                    placeholder="Enter your new password here"
                    /> <br /><br />

                    <input type="submit" value={"Reset Password"} readOnly={disabled}
                    className='bg-green-500 text-white py-3 px-6 rounded-lg font-semibold cursor-pointer hover:bg-green-600 transition duration-300 ease-in-out'
                    />
                </form>
                <div className='w-full  mt-4 text-left'>
                <Link to={"/login"}
                className='text-blue-500 font-semibold hover:underline text-left'
                >
                    Login
                </Link>
                </div>
        </div>
    </div>
  )
}