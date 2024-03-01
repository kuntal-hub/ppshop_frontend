import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import {authService} from "../apiServices/authService.js";
import {useDispatch} from "react-redux"
import {login} from "../store/authSlice.js";
import Input from "../components/Input.jsx";
import { setNotification } from '../store/notificaionSlice.js';


export default function Login() {
    const { register, handleSubmit } = useForm()
    const dispatch = useDispatch()
    const labelClass = "font-semibold block mb-1 text-white"

    const handelLogin = async (data) => {
        const response = await authService.login({identifier:data.identifier.trim(),password:data.password.trim()})

        if(response.status <400 && response.data){
            dispatch(login(response.data.user))
            dispatch(setNotification({text:"Login Success",type:"success"}))
        } else {
            dispatch(setNotification({text:response.message,type:"error"}))
        }
    }
  return (
    <div className='w-screen h-screen fixed top-0 left-0 grid place-content-center bg-white'>
        <div className='text-center p-6 bg-gray-700 rounded-lg lg:w-[35vw] md:w-[45vw] sm:w-[60vw]'>
            <h1 className='text-3xl text-white font-bold mb-6'>
                Login
            </h1>
                <form onSubmit={handleSubmit(handelLogin)}>
                    <Input 
                    type="text"
                    labelClass={labelClass}
                    lable="Username or Email"
                    {...register("identifier",{required:true})}
                    required={true}
                    placeholder="Username or Email"
                    /> <br /><br />

                    <Input
                    type="password"
                    lable="Password"
                    labelClass={labelClass}
                    {...register("password",{required:true})}
                    required={true}
                    placeholder="Password"
                    /> <br /><br />

                    <input type="submit" value={"Login"}
                    className='bg-green-500 text-white py-3 px-6 rounded-lg font-semibold cursor-pointer hover:bg-green-600 transition duration-300 ease-in-out'
                    />
                </form>
                <div className='w-full  mt-4 text-left'>
                <Link to={"/forgot-password"}
                className='text-blue-500 font-semibold hover:underline text-left'
                >
                    Forgot Password?
                </Link>
                </div>
        </div>
    </div>
  )
}
