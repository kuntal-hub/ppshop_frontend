import React from 'react'
import { useForm } from 'react-hook-form';
import Input from './Input';
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from '../store/notificaionSlice';
import { accountService } from '../apiServices/accountService';
import { updateAccounts } from '../store/accountSlice';

export default function CreateAndEditAccount({ account, setShowCreateAccount, setAccounts }) {
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const accounts = useSelector(state => state.accounts.accounts);

    const onSubmit = async (data) => {
        if (data.balance < 0) {
            alert("Balance cannot be negative!")
            return;
        }
        if (isNaN(data.balance)) {
            dispatch(setNotification({ text: "Invalid balance amount!", type: "error" }))
            return;
        }
        if (account) {
            // edit account
            const response = await accountService.updateAccount({ accountId: account._id, balance: data.balance })

            if (response.status < 400 && response.data) {
                dispatch(setNotification({ text: response.message, type: "success" }))
                setShowCreateAccount(false);
                setAccounts(prev => prev.map(acc => {
                    if (acc._id === account._id) {
                        return { ...acc, balance: data.balance }
                    }
                    return acc;
                }))
                dispatch(updateAccounts(accounts.map(acc => {
                    if (acc._id === account._id) {
                        return { ...acc, balance: data.balance }
                    }
                    return acc;
                }))
                )
            } else {
                dispatch(setNotification({ text: response.message, type: "error" }))
            }
        } else {
            // create account
            const response = await accountService.createAccount({ name: data.name, balance: data.balance })

            if (response.status < 400 && response.data) {
                dispatch(setNotification({ text: response.message, type: "success" }))
                setShowCreateAccount(false);
                setAccounts(prev => [...prev, response.data])
                dispatch(updateAccounts([...accounts, response.data]))
            } else {
                dispatch(setNotification({ text: response.message, type: "error" }))
            }
        }
    }

    return (

        <div className='w-full h-full grid place-content-center half_transparent mainContainer'>
            <div className='p-8 rounded-lg bg-white md:w-[40vw] lg:w-[30vw]'>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <Input
                        type="text"
                        lable="Name"
                        defaultValue={account ? account.name : ""}
                        placeholder="Enter account name"
                        required={true}
                        readOnly={account ? true : false}
                        {...register('name')}
                    /> <br /><br />
                    <Input
                        type="number"
                        lable="Balance"
                        placeholder="Enter balance amount"
                        required={true}
                        defaultValue={account ? account.balance : ""}
                        {...register('balance')}
                    /> <br /><br />
                    <button type="submit" className='block mx-auto mt-4 py-3 px-6 font-semibold text-white rounded-lg bg-green-600 hover:bg-green-500'>{account ? "Save Chenges" : "Create Account"}</button>
                </form>

                <button onClick={() => setShowCreateAccount(false)} title='Close'
                    className='fixed top-16 text-white p-2 hover:bg-gray-500 material-symbols-outlined right-4'
                >close</button>
            </div>
        </div>

    )
}
