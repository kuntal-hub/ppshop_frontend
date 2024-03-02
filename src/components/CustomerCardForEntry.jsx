import React from 'react'

export default function CustomerCardForEntry({customer, setCustomer,setCustomerId}) {
    const date = new Date(customer.createdAt);

return (
    <div className=' w-72 m-4 bg-white text-start p-5 rounded-2xl'>
        <p className='pb-2'><strong>Name :</strong> {customer.name}</p>
        <p className='pb-2'><strong>Aadhar :</strong> {customer.aadhar}</p>
        <p className='pb-2'><strong>ID :</strong> {customer.cId}</p>
        <p className='pb-2'><strong>Phone :</strong> {customer.phone}</p>
        <p className='pb-2'><strong>Address :</strong> {customer.address}</p>
        <p className='pb-2'><strong>Date :</strong> {date.toLocaleString()}</p>

        <div className='flex flex-nowrap justify-center mt-3'>
            <button onClick={()=>{
                setCustomer(customer);
                setCustomerId(customer.cId);
            }}
            className='py-2 font-semibold px-3 rounded-xl text-white bg-blue-600 hover:bg-blue-500'>
                Set 
            </button>

            
        </div>
    </div>
  )
}