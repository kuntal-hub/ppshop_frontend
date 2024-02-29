import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import MainContainer from '../components/MainContainer'
import { customerService } from '../apiServices/customerService'
import { setNotification } from "../store/notificaionSlice"
import { useDispatch } from "react-redux"
import CustomerEntryCard from '../components/CustomerEntryCard'
import Input from '../components/Input'
import InfiniteScroll from 'react-infinite-scroll-component';

export default function ViewCustomer() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [entries, setEntries] = useState([]);
  const [resData, setResData] = useState(null)
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const { cId } = useParams()

  const refreshPage = () => {
    setLoading(true);
    customerService.getCustomerById({ cId: cId,page:1,limit:20 })
      .then(res => {
        if (res.status < 400 && res.data) {
          setResData(res.data.entries);
          setEntries(res.data.entries.docs);
          setLoading(false);
          setPage(1);
        } else {
          dispatch(setNotification({ text: res.message, type: "error" }))
          setLoading(false)
          navigate("/error")
        }
      })
  }

  useEffect(() => {
    customerService.getCustomerById({ cId: cId,page:page,limit:20 })
      .then(res => {
        if (res.status < 400 && res.data) {
          setCustomer(res.data.customer);
          setResData(res.data.entries);
          if (page === 1) {
            setEntries(res.data.entries.docs);
          } else {
            setEntries(priv => priv.concat(res.data.entries.docs));
          }
          setLoading(false);
        } else {
          dispatch(setNotification({ text: res.message, type: "error" }))
          setLoading(false);
          navigate("/error")
        }
      })
  }, [cId,page])
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
          <button onClick={()=>navigate(`/download/${cId}`)}
            className='bg-green-600 hover:bg-green-500 block mx-auto text-white font-semibold py-2 px-4 rounded-lg'>
              Download 
            </button>

          {
            entries.length === 0 && <p className='text-lg text-red-500 mt-9 font-bold'>No Entry Created </p>
          }

          <InfiniteScroll
            dataLength={entries.length}
            next={() => setPage(page + 1)}
            height={window.innerHeight - 110}
            hasMore={resData.hasNextPage}
            loader={<h4 className='w-full text-center'>Loading...</h4>}
            endMessage={
              <p className='w-full text-center'>No More Data</p>
            }
          >
          <div className='w-full flex flex-wrap justify-center'>
            {
              entries.map((entry, index) => {
                return <CustomerEntryCard key={index} entry={entry} customer={customer} refreshPage={refreshPage} />
              })
            }
          </div>
            </InfiniteScroll>
        </div>
      }
    </MainContainer>
  )
}
