import React, { useState, useEffect } from 'react'
import Input from './Input';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setNotification } from '../store/notificaionSlice';
import { customerService } from "../apiServices/customerService.js";

export default function CustomerForm({ setShowForm, setCustomers, customer, index }) {
    const [cId, setCId] = useState(customer.cId);
    const [disable, setDisable] = useState(false);
    const [cIdError, setCIdError] = useState("");
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();

    const submit = async (data) => {
        if(
            cId === customer.cId && 
            data.name === customer.name && 
            data.aadhar === customer.aadhar && 
            data.phone === customer.phone && 
            data.address === customer.address){
            setShowForm(false);
            return;
        }

        if (!cId) {
            return setCIdError("customer Id is required")
        }

        if (!data.name.trim()) {
            return dispatch(setNotification({ text: "name is required", type: "error" }))
        }

        if (cIdError !== "Id Available!" && cId !== customer.cId) {
            return;
        }
        
        setDisable(true);
        const response = await customerService.updateCustomer({
            cId: customer.cId,
            name: data.name.trim(),
            newCId: cId.trim(),
            aadhar:data.aadhar.trim(),
            phone:data.phone.trim(),
            address:data.address.trim()
        })

        if (response.status < 400 && response.data) {
            dispatch(setNotification({ text: response.message, type: "success" }))
            setCustomers(priv => {
                const temp = [...priv];
                temp[index] = response.data;
                return temp;
            });
            setShowForm(false);
        } else {
            dispatch(setNotification({ text: response.message, type: "error" }))
            setDisable(false);
        }
    }

    const handelIdChenge = (e) => {
        setCIdError("");
        setCId(e.target.value);
    }

    useEffect(() => {
        if (cId.trim().length >0 && cId !== customer.cId) {
            const timeout = setTimeout(async () => {
                const response = await customerService.findCustomer({ cId });
                if (response.status < 400 && response.data) {
                    setCIdError("Id Already Exists!");
                } else {
                    setCIdError("Id Available!");
                }
            }, 800)
            return () => clearTimeout(timeout);
        }
    }, [cId])

    return (
        <div className='h-screen w-screen fixed top-0 left-0 grid place-content-center half_transparent'>
            <div className='bg-white p-8 rounded-lg md:min-w-[50vw] lg:min-w-[40vw] text-center'>
                <form onSubmit={handleSubmit(submit)}>
                    <Input
                        type='text'
                        lable='Name'
                        defaultValue={customer.name}
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
                    <p className={`${cIdError === "Id Available!" ? "text-green-500" : "text-red-500"} font-semibold text-sm`}>{cIdError}</p><br />


                    <Input
                        type='text'
                        lable='Aadhar'
                        defaultValue={customer.aadhar}
                        {...register('aadhar')}
                        required={true}
                        placeholder='Enter Aadhar Number...'
                    /> <br />
                    <br />


                    <Input
                        type='text'
                        lable='Phone'
                        defaultValue={customer.phone}
                        {...register('phone')}
                        required={true}
                        placeholder='Enter Phone Number...'
                    /> <br />
                    <br />


                    <Input
                        type='text'
                        lable='Address'
                        defaultValue={customer.address}
                        {...register('address')}
                        placeholder='Enter Address...'
                    /> <br /><br />

                    <input type='submit' readOnly={disable}
                        className='bg-green-600 py-2 px-4 text-white font-bold rounded-lg hover:bg-green-500 float-right'
                        value={'Save'}
                    />
                </form>

                <button onClick={() => setShowForm(false)}
                    className='bg-blue-600 py-2 px-4 text-white font-bold rounded-lg hover:bg-blue-500 float-left'>
                    cancle
                </button>

            </div>
        </div>
    )
}