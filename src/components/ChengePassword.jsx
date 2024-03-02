import React from 'react'
import {useForm} from "react-hook-form"
import { authService } from '../apiServices/authService';
import { useDispatch } from 'react-redux';
import { setNotification } from '../store/notificaionSlice';
import Input from './Input';

export default function ChengePassword() {
    const {register,handleSubmit} = useForm();
    const dispatch = useDispatch();

    const submit = async (data) => {
        if(data.newPassword.trim().length < 8){
            dispatch(setNotification({text:"Password must be at least 8 characters long",type:"error"}));
            return;
        }
        if (data.newPassword.includes(" ")) {
            dispatch(setNotification({text:"Password can't contain spaces",type:"error"}));
            return;
        }

        const response = await authService.changePassword({oldPassword:data.oldPassword.trim(),newPassword:data.newPassword.trim()});

        if(response.status < 400 && response.data){
            dispatch(setNotification({text:"Password Changed",type:"success"}));
        }
        else {
            dispatch(setNotification({text:response.message,type:"error"}));
        }
    }
    
  return (
    <div className='w-full px-8 my-4 md:w-[55%] lg:w-[40%] mx-auto'>
        <form onSubmit={handleSubmit(submit)}>
            <Input 
            type="password"
            lable="Current Password"
            required={true}
            {...register("oldPassword",{required:true})}
            />

            <Input
            type="password"
            lable="New Password"
            required={true}
            {...register("newPassword",{required:true})}
            />

            <input type="submit" value={"Chenge Password"}
            className='bg-blue-500 text-white w-full py-3 px-4 font-semibold rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out mt-4 cursor-pointer hover:bg-blue-600'
            />
        </form>
    </div>
  )
}
