import React,{useState,useEffect} from 'react'
import Input from './Input';
import {useForm} from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setNotification } from '../store/notificaionSlice';
import {customerService} from "../apiServices/customerService.js";

export default function CustomerForm({setShowForm,setCustomers}) {
  const [cId, setCId] = useState('');
  const [disable, setDisable] = useState(false);
  const [aadharError, setAadharError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [cIdError, setCIdError] = useState("");
  const {register,handleSubmit} = useForm();
  const dispatch = useDispatch();

  const submit = async (data)=>{
    setAadharError("");
    setPhoneError("");
    setDisable(true);

    if (data.aadhar.length <12 || isNaN(data.aadhar)) {
      setAadharError("Invalid aadhar number");
      return;
    }
    if (data.phone.length < 10) {
      setPhoneError("Invalid phone number");
      return;
    }
    if (cIdError !== "Id Available!") {
      return;
    }

    const response = await customerService.createCustomer({
      name: data.name.trim(),
      cId:cId.trim(),
      aadhar: data.aadhar.trim(),
      address: data.address,
      phone: data.phone.trim(),
  
    })

    if (response.status < 400 && response.data) {
      dispatch(setNotification({text:response.message, type:"success"}))
      setCustomers(priv=>[response.data,...priv]);
      setShowForm(false);
    } else{
      dispatch(setNotification({text:response.message, type:"error"}))
    }
  }

  const handelIdChenge = (e)=>{
    setCIdError("");
    setCId(e.target.value);
  }

  useEffect(()=>{
    const timeout = setTimeout(async()=>{
      if (cId.trim().length >= 4) {
        const response = await customerService.findCustomer({cId});
      if (response.status < 400 && response.data) {
        setCIdError("Id Already Exists!");
      } else {
        setCIdError("Id Available!");
      }
      }
    },800)
  },[cId])

  return (
    <div className='h-screen w-screen fixed top-0 left-0 grid place-content-center half_transparent'>
        <div className='bg-white p-8 rounded-lg md:min-w-[50vw] lg:min-w-[40vw]'>
            <form onSubmit={handleSubmit(submit)}>
                <Input 
                type='text' 
                lable='Name' 
                {...register('name')}
                required={true}
                placeholder='Enter Name...'
                /> <br /><br />
                

                <label htmlFor="cId" className='text-black font-semibold block mb-1'>
                    Customer Id :
                </label>
                <input 
                value={cId}
                onChange={handelIdChenge}
                id='cId'
                className='bg-gray-200 text-black w-full py-3 px-4 font-semibold rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out'
                type='text'
                required={true}
                placeholder='Enter Customer Id...'
                /> <br />
                <p className={`${cIdError==="Id Available!"?"text-green-500":"text-red-500"} font-semibold text-sm`}>{cIdError}</p><br />


                <Input 
                type='text' 
                lable='Aadhar' 
                {...register('aadhar')}
                required={true}
                placeholder='Enter Aadhar Number...'
                /> <br />
                <p className='text-red-500 font-semibold text-sm'>{aadharError}</p>
                <br />


                <Input 
                type='text' 
                lable='Phone' 
                {...register('phone')}
                required={true}
                placeholder='Enter Phone Number...'
                /> <br />
                <p className='text-red-500 font-semibold text-sm'>{phoneError}</p>
                <br />


                <Input 
                type='text' 
                lable='Address' 
                {...register('address')}
                placeholder='Enter Address...'
                /> <br /><br />

                <input type='submit' readOnly={disable}
                className='bg-green-600 py-2 px-4 text-white font-bold rounded-lg hover:bg-green-500 float-right'
                value={'Create'}
                />  
            </form>
                
                <button onClick={()=>setShowForm(false)}
                className='bg-blue-600 py-2 px-4 text-white font-bold rounded-lg hover:bg-blue-500 float-left'>
                    cancle
                </button>
                
        </div>
    </div>
  )
}
