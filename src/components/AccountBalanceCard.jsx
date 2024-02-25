import React,{useState} from 'react'
import CreateAndEditAccount from './CreateAndEditAccount'
import { accountService } from '../apiServices/accountService';
import { useDispatch } from 'react-redux';
import { setNotification } from '../store/notificaionSlice';

export default function AccountBalanceCard({account, setAccounts}) {
    const [showCreateAccount, setShowCreateAccount] = useState(false);
    const dispatch = useDispatch();

    const deleteAccount = async ()=>{
        const confirm = window.confirm("Are you sure you want to delete this account?");
        if (!confirm) return;
        const response = await accountService.deleteAccount({accountId:account._id});
        if (response.status < 400 && response.data) {
            setAccounts(priv=>priv.filter((acc,i)=>acc._id!==account._id));
            dispatch(setNotification({text:response.message, type:"success"}))
        } else {
            dispatch(setNotification({text:response.message, type:"error"}))
        }
    }

  return (
    <div className='w-72 m-4 bg-white text-start p-5 rounded-2xl'>
        <p className='text-center font-bold text-xl'>{account.name}</p>
        <br />
        <p><strong>Balance : </strong> {account.balance}</p>
        <br />
        <div className='flex flex-nowrap justify-between'>
            <button onClick={deleteAccount}
            className='py-2 font-semibold px-3 rounded-xl text-white bg-red-600 hover:bg-red-500'>
                Delete
            </button>

            <button onClick={()=>setShowCreateAccount(true)}
            className='py-2 font-semibold px-3 rounded-xl text-white bg-green-600 hover:bg-green-500'>
                Edit
            </button>

        </div>
        {showCreateAccount && 
        <CreateAndEditAccount 
        account={account} 
        setAccounts={setAccounts} 
        setShowCreateAccount={setShowCreateAccount}
        />}
    </div>
  )
}
