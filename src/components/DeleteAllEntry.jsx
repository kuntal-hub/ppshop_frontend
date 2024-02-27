import React from 'react'
import {useDispatch} from 'react-redux'
import { entryService } from '../apiServices/entryService'
import { setNotification } from '../store/notificaionSlice'
import {useForm} from "react-hook-form"

export default function DeleteAllEntry({setShowDeleteAllComponent,refreshPage}) {
    const dispatch = useDispatch();
    const {register, handleSubmit} = useForm();

    const onSubmit = (data) => {
        const confirmation = confirm("Are you sure you want to delete all entries? This action is irreversible.");

        if (!confirmation) return;
        
        if (data.confirmation === "Delete All Entries") {
            entryService.deleteAllEntries()
            .then(response=>{
                if (response.status < 400 && response.data) {
                    dispatch(setNotification({text:"All entries deleted successfully", type:"success"}))
                    setShowDeleteAllComponent(false);
                    refreshPage();
                } else {
                    dispatch(setNotification({text:response.message, type:"error"}))
                }
            })
        } else {
            dispatch(setNotification({text:"Invalid confirmation", type:"error"}))
        }
    }
  return (
    <div className='half_transparent_container grid place-content-center'>
        <div className='bg-white p-6 rounded-lg'>
            <h1 className='text-center text-3xl font-bold'>Hold Up!</h1>
            <p className='mt-3 font-semibold text-red-600'>
                Are you sure you want to delete all entries? <br /> This action is irreversible.
            </p>

            <form onSubmit={handleSubmit(onSubmit)}>
                <p className=' mt-5'>
                    Type <strong>"Delete All Entries"</strong> to confirm
                </p>
                <input type="text"
                placeholder="Type here"
                className='border-2 border-red-600 text-black rounded-lg p-2 w-full mt-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-300 ease-in-out focus:bg-red-200'
                {...register("confirmation", { required: true })}
                required={true}
                />

                <input type="submit" value="Delete All"
                className='bg-red-600 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded-lg mt-4 transition duration-300 ease-in-out float-right'
                />
            </form>
            <button onClick={()=>setShowDeleteAllComponent(false)}
            className='bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg mt-4 transition duration-300 ease-in-out float-left'
            >
                cancel
            </button>
        </div>
    </div>
  )
}
