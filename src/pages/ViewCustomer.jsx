import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import MainContainer from '../components/MainContainer'
import { customerService } from '../apiServices/customerService'
import { setNotification } from "../store/notificaionSlice"
import { useDispatch } from "react-redux"
import CustomerEntryCard from '../components/CustomerEntryCard'
import Input from '../components/Input'

export default function ViewCustomer() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const { cId } = useParams()

  const refreshPage = () => {
    setLoading(true);
    customerService.getCustomerById({ cId: cId })
      .then(res => {
        if (res.status < 400 && res.data) {
          setCustomer(res.data)
          setLoading(false);
        } else {
          dispatch(setNotification({ text: res.message, type: "error" }))
          setLoading(false)
          navigate("/error")
        }
      })
  }

  useEffect(() => {
    customerService.getCustomerById({ cId: cId })
      .then(res => {
        if (res.status < 400 && res.data) {
          setCustomer(res.data)
          setLoading(false);
        } else {
          dispatch(setNotification({ text: res.message, type: "error" }))
          setLoading(false);
          navigate("/error")
        }
      })
  }, [cId])
  return (
    <MainContainer>
      {loading ?
        <div className='w-full h-full grid place-content-center text-3xl font-bold text-black'>
          Loading...
        </div> :
        <div className='w-full pb-10' >
          <h2 className='text-2xl my-4 font-bold'>Customer Details</h2>
          <div className='flex flex-nowrap justify-center w-full'>
            <div className="w-[50%]">
              <div className='w-[80%] mx-auto'>
                  <Input
                  type="text"
                  lable="Name"
                  value={customer.name}
                  readOnly={true}
                  />
                  <Input
                  type="text"
                  lable="Aadhar"
                  value={customer.aadhar}
                  readOnly={true}
                  />
                  <Input
                  type="text"
                  lable="Address"
                  value={customer.address}
                  readOnly={true}
                  />

              </div>
            </div>
            <div className="w-[50%]">
              <div className='w-[80%] mx-auto'>
              <Input
                  type="text"
                  lable="ID"
                  value={customer.cId}
                  readOnly={true}
                  />
                  <Input
                  type="text"
                  lable="Phone"
                  value={customer.phone}
                  readOnly={true}
                  />
              </div>
            </div>

          </div>
          <h1 className='text-2xl my-4 font-bold'>Customer's Entries</h1>
          <div className='w-full flex flex-wrap justify-center'>
            {
              customer.entries.map((entry, index) => {
                return <CustomerEntryCard key={index} entry={entry} refreshPage={refreshPage} />
              })
            }
          </div>
        </div>
      }
    </MainContainer>
  )
}
