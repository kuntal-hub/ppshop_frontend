import React from 'react'
import MainContainer from './MainContainer'
import Input from './Input'
import { authService } from '../apiServices/authService'
import { useDispatch } from 'react-redux'
import { setNotification } from '../store/notificaionSlice'
import {useForm} from "react-hook-form"

export default function CreateUserForm({setshowCreateUserForm,setusers}) {
    const dispatch = useDispatch();
    const {register,handleSubmit} = useForm();
    const labelClass = "font-semibold block mb-1 text-white"

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

    const onSubmit = async (data) => {
        if(data.password.length < 8){
            return dispatch(setNotification({text:"Password must be at least 8 characters long",type:"error"}));
        }
        if (!isValidUsername(data.username.trim())) {
            return dispatch(setNotification({text:"Invalid username",type:"error"}));
        }
        const response = await authService.createUser({
            username:data.username.trim(),
            email:data.email.trim(),
            password:data.password.trim()
        });

        if(response.status < 400 && response.data){
            dispatch(setNotification({text:"User Created",type:"success"}));
            setusers(prev => [...prev,response.data]);
            setshowCreateUserForm(false);
        } else {
            dispatch(setNotification({text:response.message,type:"error"}));
        }
    }

  return (
    <MainContainer>
        <div className='w-full h-full grid place-content-center'>
        <div className='text-center p-6 bg-gray-700 rounded-lg lg:w-[35vw] md:w-[45vw] sm:w-[60vw]'>
            <h1 className='text-3xl text-white font-bold mb-6'>
                Register User
            </h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input 
                    type="text"
                    labelClass={labelClass}
                    lable="UserName"
                    {...register("username",{required:true})}
                    required={true}
                    placeholder="Enter Your Username"
                    /> <br /><br />

                    <Input 
                    type="email"
                    labelClass={labelClass}
                    lable="Email"
                    {...register("email",{required:true})}
                    required={true}
                    placeholder="Enter Your Email"
                    /> <br /><br />

                    <Input
                    type="password"
                    lable="Password"
                    labelClass={labelClass}
                    {...register("password",{required:true})}
                    required={true}
                    placeholder="Password"
                    /> <br /><br />

                    <input type="submit" value={"Create User"}
                    className='bg-green-500 text-white py-3 px-6 rounded-lg font-semibold cursor-pointer hover:bg-green-600 transition duration-300 ease-in-out'
                    />
                </form>
        </div>
        </div>
        <button onClick={() => setshowCreateUserForm(false)}
        className='fixed material-symbols-outlined top-16 right-5'>
            close
        </button>
    </MainContainer>
  )
}
