import React,{useState} from 'react'
import { customerService } from '../apiServices/customerService';
import { setNotification } from '../store/notificaionSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import EditCustomer from "./EditCustomer.jsx";

export default function CustomerCard({customer,index,setCustomers}) {
    const date = new Date(customer.createdAt);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showForm, setShowForm] = useState(false);

    const deleteCustomer = async ()=>{
        const confirm = window.confirm("Are you sure you want to delete this customer?");
        if (!confirm) return;
        const response = await customerService.deleteCustomer({cId:customer.cId});
        if (response.status < 400 && response.data) {
            setCustomers(priv=>priv.filter((c,i)=>i!==index));
            dispatch(setNotification({text:response.message, type:"success"}))
        } else {
            dispatch(setNotification({text:response.message, type:"error"}))
        }
    }

return (
    <div className=' w-72 m-4 bg-white text-start p-5 rounded-2xl'>
        <p className='pb-2'><strong>Name :</strong> {customer.name}</p>
        <p className='pb-2'><strong>Aadhar :</strong> {customer.aadhar}</p>
        <p className='pb-2'><strong>ID :</strong> {customer.cId}</p>
        <p className='pb-2'><strong>Phone :</strong> {customer.phone}</p>
        <p className='pb-2'><strong>Address :</strong> {customer.address}</p>
        <p className='pb-2'><strong>Date :</strong> {date.toLocaleString()}</p>

        <div className='flex flex-nowrap justify-between mt-3'>
            <button onClick={()=>navigate(`/${customer.cId}`)}
            className='py-2 font-semibold px-3 rounded-xl text-white bg-blue-600 hover:bg-blue-500'>
                View
            </button>

            <button onClick={()=>setShowForm(true)}
            className='py-2 font-semibold px-3 rounded-xl text-white bg-green-600 hover:bg-green-500'>
                Edit
            </button>

            <button onClick={deleteCustomer}
            className='py-2 font-semibold px-3 rounded-xl text-white bg-red-600 hover:bg-red-500'>
                Delete
            </button>
        </div>
        {showForm && <EditCustomer customer={customer} index={index} setCustomers={setCustomers} setShowForm={setShowForm}/>}
    </div>
  )
}

